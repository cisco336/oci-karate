'use client';
import React from 'react';
import { iArticle } from '../shared/Card';
import { Button, buttonVariants } from '../shared/Button';

import { MdOutlineArrowBackIos } from 'react-icons/md';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { MdFiberManualRecord } from 'react-icons/md';
import Link from 'next/link';

export const Carousel = ({ articles }: { articles: iArticle[] }) => {
    console.log(articles[0].articleContent.json);
    const [current, setCurrent] = React.useState(0);
    const [isLoading, setLoading] = React.useState(false);
    const forward = () =>
        setCurrent((prev) => (prev + 1 > articles.length - 1 ? 0 : prev + 1));
    const back = () =>
        setCurrent((prev) => (prev - 1 < 0 ? articles.length - 1 : prev - 1));
    const dots = articles.map((_, i) => (
        <Button
            label=""
            variant={buttonVariants.Link}
            click={() => setCurrent(i)}>
            <MdFiberManualRecord
                key={i}
                className={`text-sm ${
                    current === i ? 'text-danger-300' : 'text-gray-400'
                }`}
            />
        </Button>
    ));

    return (
        <div className="w-full relative grid grid-cols-[min-content_1fr_min-content] md:grid-cols-[min-content_1fr_300px_min-content] gap-4 gap-x-16 md:p-8 max-w-[1200px]">
            <img
                src={articles[current].asset?.url}
                alt={articles[current].articleTitle}
                className={`absolute object-cover opacity-50 blur-[100px] col-[1/4] row-[1/4] `}
            />
            <span className="col-[1] row-[1/4] flex items-center">
                <Button
                    click={back}
                    label=""
                    variant={buttonVariants.Link}>
                    <MdOutlineArrowBackIos />
                </Button>
            </span>
            <div className="col-[2] row-[2] md:row[3] flex flex-col gap-4 items-center md:items-start">
                <h3 className="font-thin text-4xl ">
                    {articles[current].articleTitle}
                </h3>
                <p className="">{articles[current].abstract}</p>
                <span className="flex md:justify-end">
                    <Link href={`${articles[current].slug}`}>
                        <Button
                            click={() => setLoading(true)}
                            variant={buttonVariants.Ghost}
                            loading={isLoading}>
                            Ver más <MdOutlineArrowForwardIos />
                        </Button>
                    </Link>
                </span>
            </div>
            <span className="md:col-[4] row-[1/4] flex items-center col-[3]">
                <Button
                    click={forward}
                    label=""
                    variant={buttonVariants.Link}>
                    <MdOutlineArrowForwardIos />
                </Button>
            </span>
            <div className="flex justify-center col-[1/4] md:col-[1/5] row-[4]">
                {dots}
            </div>
            <img
                src={articles[current].asset?.url}
                alt={articles[current].articleTitle}
                className="object-fit md:col-[3] row-[1/4] w-[auto] h-[300px] rounded-lg col-[2] mx-auto opacity-0 z-[0] md:opacity-100 shadow"
            />
        </div>
    );
};
