'use client';
import { iArticle } from '@/app/models/gqlModels';
import React from 'react';

const Card = (props: iArticle) => {
    const { articleTitle, abstract, asset } = props;
    return (
        <div className="flex flex-col overflow-clip justify-center sm:min-h-[500px] md:w-1/4 sm:w-1/3 md:w-10:rem relative group/item">
            {asset?.url && (
                <img
                    className="object-cover w-auto h-full grayscale-0 
                    relative
                    group-hover/item:grayscale"
                    src={asset?.url}
                    alt={asset?.url}
                />
            )}
            <div className="transition absolute w-full h-full p-4 group/content backdrop-brightness-[0.2] translate-y-3/4 group-hover/item:translate-y-0 ease-out duration-300">
                <h1 className="h-1/4 group-hover/item:h-auto mb-4">
                    {articleTitle}
                </h1>
                <p className="">{abstract}</p>
            </div>
        </div>
    );
};

export default Card;
