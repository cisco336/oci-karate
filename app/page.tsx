import {
    getData,
    quoteQueryBySlug,
    articlesByTagQuery,
} from '../services/hygraph.service';
import Card from '../components/shared/Card/Card';
import Quote from '@/components/Quote';
import { iArticlesResponse, iQuote } from '../models/gqlModels';
import { iArticle } from '@/components/shared/Card';
import { Suspense } from 'react';

export const mainquote: Promise<iQuote> = getData<iQuote>(quoteQueryBySlug, {
    slug: 'quote-manos-vacias',
});

export const articles: Promise<iArticlesResponse> = getData<iArticlesResponse>(
    articlesByTagQuery,
    {
        tag: ['main_page'],
    }
);

export default async function Index() {
    const [quote, contents] = await Promise.allSettled([mainquote, articles]);
    const content =
        contents.status === 'fulfilled' &&
        contents.value.articleSchemas
            .filter((article) => article?.tag?.includes('important'))
            .map((article: iArticle) => (
                <Card
                    {...article}
                    key={article.id}
                />
            ));
    const mainQuote = quote.status === 'fulfilled' && (
        <div className="mx-auto hidden sm:flex px-4">
            <Quote {...quote.value} />
        </div>
    );

    return (
        <Suspense fallback={<div className="text-white">Loading...</div>}>
            <div className="w-full flex flex-col gap-20 items-center py-4">
                <div className="flex flex-wrap max-w-[1200px]">{content}</div>
                {mainQuote}
            </div>
        </Suspense>
    );
}
