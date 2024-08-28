import {
    getData,
    quoteQueryBySlug,
    articlesByTagQuery,
    getCategoryHeaders,
} from '../services/hygraph.service';
import Quote from '@/components/Quote/Quote';
import { iQuote } from '../models/gqlModels';
import { iArticle } from '@/components/shared/Card';
import { Suspense } from 'react';
import { Carousel } from '@/components/Carousel/Carousel';
import { categories } from '@/services/enums';
import { Headers } from '@/components/Categories/Headers';

export interface iArticlesResponse {
    articleSchemas: iArticle[];
}

async function Index() {
    const categoriesNames = Object.values(categories).map((category) => {
        console.log(category);
        return getData<iArticlesResponse>(getCategoryHeaders, {
            tag: ['header'],
            category: [category],
        });
    });

    const categoryHeader = await Promise.allSettled([...categoriesNames]).then(
        (responses) =>
            responses.filter(
                (response) =>
                    response.status === 'fulfilled' &&
                    response.value.articleSchemas.length
            )
    );

    const mainquote: Promise<iQuote> = getData<iQuote>(quoteQueryBySlug, {
        slug: 'quote-manos-vacias',
    });

    const articles: Promise<iArticlesResponse> = getData<iArticlesResponse>(
        articlesByTagQuery,
        {
            tag: ['carousel'],
        }
    );

    const [quote, contents] = await Promise.allSettled([mainquote, articles]);
    console.log(contents);
    return (
        <Suspense fallback={<div className="text-white">Loading...</div>}>
            {contents.status === 'fulfilled' &&
                quote.status === 'fulfilled' && (
                    <div className="w-full flex flex-col gap-20 items-center">
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
