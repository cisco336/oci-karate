import { ArticleTypesResponse } from '@/app/page';
import React from 'react';
import Card from '../shared/Card/Card';
import { ArticleType } from '@/@types';

export const Headers = ({
    data,
}: {
    data: PromiseSettledResult<ArticleTypesResponse>[];
}) => {
    const value = data
        .map((dat) => (dat as unknown as { value: ArticleTypesResponse }).value)
        .map((value: ArticleTypesResponse) => value.articleSchemas)
        .flat();
    return (
        <div className="grid md:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] md:gap-4 md:p-8">
            <h1 className="font-thin md:text-8xl text-6xl col-[1/-1] row-[1] mb-10">
                Categorías
            </h1>
            {value.map((article: ArticleType) => (
                <Card
                    {...article}
                    link={`/category/${article.category?.[0]}`}
                />
            ))}
        </div>
    );
};
