'use client';
import { ArticleType } from '@/@types';
import React, { useState } from 'react';
import { Button, buttonVariants } from '../Button';
import { useRouter } from 'next/navigation';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { z } from 'zod';

const zCard = ArticleType.extend({
    link: z.string().optional(),
});

export type CardType = z.TypeOf<typeof zCard>;

const Card = ({
    id,
    articleTitle,
    abstract,
    asset,
    slug,
    category,
    link,
}: CardType) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const handleClick = (url?: string) => {
        if (url) {
            setLoading(true);
            router.push(url);
        }
    };
    return (
        <div
            key={id}
            className="relative border border-gray-700 md:rounded-lg p-8 flex flex-col gap-4 overflow-clip transform transition duration-500 md:hover:scale-110 backdrop-blur-lg md:hover:z-[10] z-1">
            <h3 className="font-thin text-4xl">{articleTitle}</h3>
            <h1 className="font-bold opacity-10 text-[10rem] absolute -bottom-20 -right-30">
                {articleTitle}
            </h1>
            <p>{abstract}</p>
            <span className="">
                <Button
                    variant={buttonVariants.Ghost}
                    click={() => handleClick(link)}
                    loading={isLoading}
                    disabled={isLoading}>
                    Ver más <MdOutlineArrowForwardIos />
                </Button>
            </span>

            <img
                src={asset?.url}
                className="h-[100%] w-[auto] blur-2xl object-fit opacity-50 absolute top-0 left-0 z-[-1]"
            />
        </div>
    );
};

export default Card;
