import React from 'react';
import { iArticle } from '../shared/Card';
import Card from '../shared/Card/Card';

export const ImportantArticles = ({ articles }: { articles: iArticle[] }) => {
    return (
        <div className="flex flex-wrap max-w-[1200px]">
            {articles
                .filter((article) => article?.tag?.includes('important'))
                .map((article: iArticle) => (
                    <Card
                        {...article}
                        key={article.id}
                    />
                ))}
        </div>
    );
};
