'use client';
import { iArticlesResponse } from '@/app/page';
import { ArticleSegmentType } from '@/app/slug/[slug]/page';
import { RenderArticle } from '@/app/slug/[slug]/pageHelpers';
import {
    Button,
    buttonColor,
    buttonVariants,
} from '@/components/shared/Button';
import { capitalizeFirstLetter } from '@/helpers/capitalize';
import { getData, getArticlesByCategory } from '@/services/hygraph.service';
import Link from 'next/link';
import React from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

const CategoryArticleListPage = async ({ params }: any) => {
    const { category } = params;
    const [loading, setLoading] = React.useState(false);
    const articleList = await getData<iArticlesResponse>(
        getArticlesByCategory,
        {
            category: [category],
        }
    ).then((data) => data.articleSchemas);

    const headerArticleData = articleList.find((article) =>
        article?.tag?.includes('header')
    )?.articleContent?.json as ArticleSegmentType;

    const headerContent =
        headerArticleData &&
        headerArticleData.children.map((child, index) => (
            <React.Fragment key={index}>
                {RenderArticle(child as unknown as ArticleSegmentType)}
            </React.Fragment>
        ));

    return (
        <div className="flex flex-col gap-4 p-8 items-start w-full animate-fade-in">
            <h1 className="font-thin text-6xl">
                {capitalizeFirstLetter(category)}
            </h1>
            {headerContent}
            <div className="grid md:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4 p-8">
                {articleList.map((article) => (
                    <div
                        key={article.id}
                        className="relative border border-gray-700 rounded-lg p-8 flex flex-col gap-4 overflow-clip transform transition duration-500 md:hover:scale-110 backdrop-blur-lg md:hover:z-[10] z-1">
                        <h3 className="font-thin text-4xl">
                            {article?.articleTitle}
                        </h3>
                        <h1 className="font-bold opacity-10 text-[10rem] absolute -bottom-20 -right-30">
                            {article?.articleTitle}
                        </h1>
                        <p>{article?.abstract}</p>
                        <Link
                            href={`/slug/${article?.slug}`}
                            className="mt-auto">
                            <Button variant={buttonVariants.Ghost}>
                                Ver artículo <MdOutlineArrowForwardIos />
                            </Button>
                        </Link>
                        <img
                            src={article.asset?.url}
                            className="h-[100%] w-[auto] blur-2xl object-fit opacity-50 absolute top-0 left-0 z-[-1]"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryArticleListPage;
