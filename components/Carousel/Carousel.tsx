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

    const controlBack = (
        <span className="col-[1] row-[1/4] flex items-strech">
            <Button
                click={back}
                label=""
                variant={buttonVariants.Link}>
                <MdOutlineArrowBackIos />
            </Button>
        </span>
    );

    const controlForward = (
        <span className="col-[3] row-[1/4] flex items-strech z-[20]">
            <Button
                click={forward}
                label=""
                variant={buttonVariants.Link}>
                <MdOutlineArrowForwardIos />
            </Button>
        </span>
    );

    const dots = (
        <div className="flex justify-center col-[1/-1] row-[2]">
            {articles.map((_, i) => (
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
            ))}
        </div>
    );

    const slide = () => {
        return (
            <React.Fragment>
                {articles.map((article, i) => (
                    <div
                        className={`grid grid-cols-[1] md:grid-cols-[1fr_300px] gap-6 ${
                            current === i
                                ? 'animate-fade-in'
                                : 'animate-fade-out hidden'
                        }`}>
                        <img
                            src={articles[current].asset?.url}
                            alt={articles[current].articleTitle}
                            className={`absolute object-cover opacity-50 blur-[100px] col-[1/-1] row-[1/-1] z-[-1]`}
                        />
                        <div className="col-[1] row-[1/-1] flex flex-col gap-4 items-center md:items-start justify-end">
                            <h3 className="font-thin text-4xl ">
                                {articles[current].articleTitle}
                            </h3>
                            <p className="">{articles[current].abstract}</p>
                            <span className="flex md:justify-end">
                                <Link href={`/slug/${articles[current].slug}`}>
                                    <Button
                                        click={() => setLoading(true)}
                                        variant={buttonVariants.Ghost}
                                        loading={isLoading}>
                                        Ver más <MdOutlineArrowForwardIos />
                                    </Button>
                                </Link>
                            </span>
                        </div>
                        <img
                            src={articles[current].asset?.url}
                            alt={articles[current].articleTitle}
                            className="object-fit  w-[auto] h-[300px] rounded-lg col-[2] mx-auto opacity-0 z-[0] md:opacity-100 shadow"
                        />
                    </div>
                ))}
            </React.Fragment>
        );
    };

    return (
        <div className="w-full relative grid grid-cols-[min-content_1fr_min-content] gap-4 gap-x-16 pt-4 md:p-8 max-w-[1200px]">
            {controlBack}
            {slide()}
            {controlForward}
            {dots}
        </div>
    );
};
