import { ArticleTypesResponse } from '@/app/page';
import { ArticleSegmentType } from '@/app/slug/[slug]/page';
import { RenderArticle } from '@/app/slug/[slug]/pageHelpers';
import Card from '@/components/shared/Card/Card';
import { capitalizeFirstLetter } from '@/helpers/capitalize';
import { getData, getArticlesByCategory } from '@/services/hygraph.service';
import React from 'react';

const CategoryArticleListPage = async ({ params }: any) => {
    const { category } = params;
    const articleList = await getData<ArticleTypesResponse>(
        getArticlesByCategory,
        {
            category: [category],
            tag: ['header'],
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
                {articleList.map((article) => {
                    console.log(article.slug);
                    return (
                        <Card
                            {...article}
                            link={`/slug/${article?.slug}`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryArticleListPage;
