import {
  getData,
  quoteQueryBySlug,
  articlesByTagQuery,
  getCategoryHeaders,
} from '../services/hygraph.service';
import Quote from '@/components/Quote/Quote';
import { Suspense } from 'react';
import { Carousel } from '@/components/Carousel/Carousel';
import { categories } from '@/services/enums';
import { Headers } from '@/components/Categories/Headers';
import { ArticleType } from '@/@types/Article';
import { QuoteType } from '@/@types';
import { Loader } from '@/components/shared/Loader/Loader';

export interface ArticleTypesResponse {
  articleSchemas: ArticleType[];
}

async function Index() {
  const categoriesNames = Object.values(categories).map((category) => {
    return getData<ArticleTypesResponse>(getCategoryHeaders, {
      tag: ['header'],
      category: [category],
    });
  });

  const categoryHeader = await Promise.allSettled([...categoriesNames]).then(
    (responses) =>
      responses.filter(
        (response) =>
          response.status === 'fulfilled' &&
          response.value.articleSchemas.length,
      ),
  );

  const mainquote: Promise<QuoteType> = getData<QuoteType>(quoteQueryBySlug, {
    slug: 'quote-manos-vacias',
  });

  const articles: Promise<ArticleTypesResponse> = getData<ArticleTypesResponse>(
    articlesByTagQuery,
    {
      tag: ['carousel'],
    },
  );

  const [quote, contents] = await Promise.allSettled([mainquote, articles]);
  return (
    <Suspense fallback={<Loader />}>
      {contents.status === 'fulfilled' && quote.status === 'fulfilled' && (
        <div className="w-full flex flex-col gap-20 items-center animate-fade-in">
          <Carousel articles={contents.value.articleSchemas} />
          <div className="mx-auto flex p-6">
            <Quote {...quote.value} />
          </div>
          <Headers data={categoryHeader} />
        </div>
      )}
    </Suspense>
  );
}

export default Index;
