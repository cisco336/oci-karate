'use client';
import React from 'react';
import { Button, buttonVariants } from '../shared/Button';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdFiberManualRecord,
} from 'react-icons/md';
import Link from 'next/link';
import { ArticleType } from '@/@types';

export const Carousel = ({ articles }: { articles: ArticleType[] }) => {
  const [current, setCurrent] = React.useState<number>(0);
  const [isLoading, setLoading] = React.useState<boolean>(false);

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
          key={`dot-${i}`}
          label=""
          variant={buttonVariants.Link}
          click={() => setCurrent(i)}>
          <MdFiberManualRecord
            className={`text-sm ${current === i ? 'text-danger-300' : 'text-gray-400'}`}
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
            key={i}
            className={`grid grid-cols-[1] md:grid-cols-[1fr_300px] gap-6 ${current === i ? 'animate-fade-in' : 'animate-fade-out hidden'}`}>
            <img
              src={articles[current].asset?.url}
              alt={articles[current].articleTitle}
              className={`absolute object-cover opacity-50 blur-[100px] col-[1/-1] row-[1/-1] z-[-1]`}
            />
            <div className="col-[1] row-[1/-1] flex flex-col gap-4 items-center md:items-start justify-end">
              <h3>{articles[current].articleTitle}</h3>
              <p>{articles[current].abstract}</p>
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
              className="object-fit w-[auto] h-[300px] rounded-lg col-[2] mx-auto opacity-0 z-[0] md:opacity-100 shadow hidden md:block"
            />
          </div>
        ))}
      </React.Fragment>
    );
  };

  return (
    <div className="w-full relative grid grid-cols-[min-content_1fr_min-content] gap-4 md:gap-x-16 pt-4 md:p-8 max-w-[1200px] sm:gap-x-1">
      {controlBack}
      {slide()}
      {controlForward}
      {dots}
    </div>
  );
};
