import { ArticleTypesResponse } from '@/app/page';
import Card from '@/components/shared/Card/Card';
import { capitalizeFirstLetter } from '@/helpers/capitalize';
import { getData, getArticlesByCategory } from '@/services/hygraph.service';
import React from 'react';
import parse from 'html-react-parser';
import { auth } from '@/auth';
import { getSingleArticleBySlug } from '@/services/queries';
import { redirect } from 'next/navigation';

const CategoryArticleListPage = async ({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { slug: string };
}) => {
  const session = await auth();
  const { category } = params;
  const { slug } = searchParams;
  const { articleSchema } = await getData<{ articleSchema: any }>(
    getSingleArticleBySlug,
    {
      slug: slug,
    },
  );

  const articleIsPrivate = articleSchema?.tag?.includes('private');

  if (articleIsPrivate && !session) {
    redirect('/');
  }

  const articleList = await getData<ArticleTypesResponse>(
    getArticlesByCategory,
    {
      category: [category],
      tag: ['header'],
    },
  ).then((data) => data.articleSchemas);

  const headerArticleData = articleList.find((article) =>
    article?.tag?.includes('header'),
  )?.articleContent?.html;

  const headerContent =
    parse(headerArticleData ?? '') ||
    'No header content found for this category';

  const content = parse(articleSchema?.articleContent?.html);

  return (
    <div className="flex flex-col gap-4 py-8 items-start w-full animate-fade-in max-w-[1200px]">
      {headerContent}
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="grow max-w-[800px] flex flex-col gap-6">
          <h1 className="font-thin">
            {capitalizeFirstLetter(articleSchema.articleTitle)}
          </h1>
          {content}
        </div>
        {articleSchema.asset.url && (
          <img
            className="w-full h-auto object-cover my-8 max-w-[50%]"
            src={articleSchema.asset.url}
            alt={articleSchema.asset.alt}
          />
        )}
      </div>
      <div className="grid md:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 py-8">
        {articleList.map((article) => {
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
