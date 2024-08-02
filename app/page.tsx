import AuthButton from '../components/AuthButton';
import {
    getServerSideProps,
    quoteQueryBySlug,
    articlesByTagQuery,
} from '../services/hygraph.service';
import Card from '../components/shared/Card';
import Quote from '@/components/Quote';
import { iArticle, iArticlesResponse, iQuote } from '../models/gqlModels';

export default async function Index() {
    const articles: iArticlesResponse = await getServerSideProps(
        articlesByTagQuery,
        { tag: ['main_page'] }
    );
    const importantArticles: iArticle[] | null = [];
    const otherArticles: iArticle[] | null = [];
    articles.articleSchemas.forEach((article) => {
        if (article?.tag?.includes('important')) {
            importantArticles.push(article);
        } else {
            otherArticles.push(article);
        }
    });
    const mainquote: iQuote = await getServerSideProps(quoteQueryBySlug, {
        slug: 'quote-manos-vacias',
    });

    const mainQuote = mainquote && (
        <div className="mx-auto hidden sm:flex px-4">
            <Quote {...mainquote} />
        </div>
    );

    return (
        <div className="w-full flex flex-col gap-20 items-center py-4">
            <div className="flex flex-wrap max-w-[1200px]">
                {importantArticles.length &&
                    importantArticles.map((article: iArticle) => (
                        <Card
                            {...article}
                            key={article.id}
                        />
                    ))}
            </div>
            {mainQuote}
        </div>
    );
}
