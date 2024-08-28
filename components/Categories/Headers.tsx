import { iArticlesResponse } from '@/app/page';
import React from 'react';
import { iArticle } from '../shared/Card';
import { Button, buttonVariants } from '../shared/Button';
import Link from 'next/link';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

export const Headers = ({
    data,
}: {
    data: PromiseSettledResult<iArticlesResponse>[];
}) => {
    console.log(data);
    const value = data
        .map((dat) => (dat as unknown as { value: iArticlesResponse }).value)
        .map((value: iArticlesResponse) => value.articleSchemas)
        .flat();
    return (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 p-8">
            <h1 className="font-thin text-8xl col-[1/-1] row-[1] mb-10">
                Categorías
            </h1>
            {value.map((article: iArticle) => (
                <div
                    key={article.id}
                    className="relative border border-gray-700 rounded-lg p-8 flex flex-col gap-4 overflow-clip transform transition duration-500 hover:scale-110 backdrop-blur-lg hover:z-[10] z-1">
                    <h3 className="font-thin text-4xl">
                        {article?.articleTitle}
                    </h3>
                    <h1 className="font-bold opacity-10 text-[10rem] absolute -bottom-20 -right-30">
                        {article?.articleTitle}
                    </h1>
                    <p>{article?.abstract}</p>
                    <Link
                        href={''}
                        className="mt-auto">
                        <Button variant={buttonVariants.Ghost}>
                            Ver más <MdOutlineArrowForwardIos />
                        </Button>
                    </Link>
                    <img
                        src={article.asset?.url}
                        className="h-[100%] w-[100%] object-fit opacity-20 absolute top-0 left-0 z-[-1]"
                    />
                </div>
            ))}
        </div>
    );
};
