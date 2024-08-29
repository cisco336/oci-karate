import { ArticleTypesResponse } from '@/app/page';
import React from 'react';
import { ArticleType, ArticleType } from '../shared/Card';
import { Button, buttonVariants } from '../shared/Button';
import Link from 'next/link';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Card from '../shared/Card/Card';

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
        <div className="grid md:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 p-8">
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
