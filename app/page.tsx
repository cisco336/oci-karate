import { getData } from '../services/hygraph.service';
import Quote from '@/components/Quote/Quote';
import { Carousel } from '@/components/Carousel/Carousel';
import { Headers } from '@/components/Categories/Headers';
import { ArticleType } from '@/@types/Article';
import {
  articlesByTagQuery,
  articlesByTagQueryPrivate,
  GetEnumsValuesType,
  getEnumValues,
} from '@/services/queries';
import { auth } from '@/auth';

export interface ArticleTypesResponse {
  articleSchemas: ArticleType[];
}

async function Index() {
  const session = await auth();

  const articlesByTag: ArticleTypesResponse =
    session && session.activated
      ? await getData<ArticleTypesResponse>(articlesByTagQueryPrivate, {
          tag: ['header', 'carousel', 'main_quote'],
        })
      : await getData<ArticleTypesResponse>(articlesByTagQuery, {
          tag: ['header', 'carousel', 'main_quote'],
        });

  const carouselArticles = articlesByTag.articleSchemas.filter((article) =>
    article?.tag?.includes('carousel'),
  );

  const mainQuote = articlesByTag.articleSchemas.find((article) =>
    article?.tag?.includes('main_quote'),
  );

  const headerArticles = articlesByTag.articleSchemas.filter((article) => {
    return article?.tag?.includes('header');
  });

  return (
    <div className="w-full flex flex-col gap-20 items-center animate-fade-in">
      <Carousel articles={carouselArticles} />
      <div className="mx-auto flex p-6 flex-col gap-20">
        {mainQuote && (
          <div className="w-full flex justify-center">
            <Quote {...mainQuote} />
          </div>
        )}
        {headerArticles && <Headers data={headerArticles} />}
      </div>
    </div>
  );
}

export default Index;
