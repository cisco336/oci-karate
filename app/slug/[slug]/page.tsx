import { getData, getSingleArticleBySlug } from '@/services/hygraph.service';
import React from 'react';
import parse from 'html-react-parser';
import { RenderArticle } from './pageHelpers';

export type ArticleSegmentChildType = {
  text: string;
  bold?: boolean;
};

export type ArticleSegmentType = {
  type: string;
  children: ArticleSegmentChildType[];
};

const SingleArticleBySlug = async ({ params }: any) => {
  const { articleSchema } = await getData<{ articleSchema: any }>(
    getSingleArticleBySlug,
    {
      slug: params?.slug,
    },
  );
  const {
    articleTitle,
    createdAt,
    updatedAt,
    tag,
    asset,
    images,
    articleContent,
    htmlContent,
  } = articleSchema;
  const createdDate = new Date(createdAt).toLocaleString();
  const updatedDate = new Date(createdAt).toLocaleString();
  const content = parse(htmlContent ? htmlContent : articleContent.html);
  return (
    <>
      <div className="p-[2rem] max-w-[600px]">
        <h1 className="text-6xl mb-[2rem] font-thin">{articleTitle}</h1>
        <img
          src={asset.url}
          alt={asset.alt}
          className="w-full h-auto object-cover my-8"
        />
        <div className="[&_h3]:mt-8 [&_h3]:mb-4 [&_p]:mb-4 [&_ol]:pb-4 [&_li]:list-decimal [&_li]:pt-4">
          {content}
        </div>
        <div className="flex flex-col items-end justify-end mt-8 font-thin italic text-sm">
          <div>Creado el: {createdDate}</div>
          <div>Actualizado el: {updatedDate}</div>
        </div>
      </div>
      <img
        src={asset.url}
        alt={asset.alt}
        className="h-[100%] w-[auto] blur-2xl object-fit opacity-10 absolute top-0 left-0 z-[0]"
      />
    </>
  );
};

export default SingleArticleBySlug;
