import DeployButton from '../components/DeployButton';
import AuthButton from '../components/AuthButton';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import {
    articlesQuery,
    getServerSideProps,
    quoteQueryBySlug,
} from '../services/hygraph.service';
import { useEffect } from 'react';
import Card from '../components/Card';
import Quote from '@/components/Quote';
import { iArticle, iArticlesResponse, iQuote } from './models/gqlModels';

export default async function Index() {
    const articles: iArticlesResponse = await getServerSideProps(articlesQuery);
    const mainquote: iQuote = await getServerSideProps(quoteQueryBySlug, {
        slug: 'quote-manos-vacias',
    });

    const mainQuote = mainquote && <Quote {...mainquote} />;

    return (
        <div className="w-full flex flex-col gap-20 items-center p-3">
            <h1>Main page</h1>
            {mainQuote}
            <div className="flex flex-wrap">
                {articles &&
                    articles.articleSchemas.map((article: iArticle) => (
                        <Card
                            {...article}
                            key={article.id}
                        />
                    ))}
            </div>
        </div>
    );
}
