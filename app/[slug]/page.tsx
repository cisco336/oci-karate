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
        }
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
    const content = parse(htmlContent ? htmlContent : articleContent.html);
    return articleContent.json.children.lenght > 0 ? (
        <div className="p-[2rem] max-w-[600px]">
            <h1 className="text-6xl mb-[2rem] font-thin">{articleTitle}</h1>
            {content}
        </div>
    ) : (
        <div className="relative flex flex-col items-center w-full h-full">
            <div className="max-w-[800px] z-10">
                <h1 className="text-6xl font-thin py-12">{articleTitle}</h1>
                {articleContent.json.children.map(
                    (child: ArticleSegmentType, index: number) => {
                        return (
                            <React.Fragment key={index}>
                                {RenderArticle(child)}
                            </React.Fragment>
                        );
                    }
                )}
            </div>
            <img
                className="object-cover absolute blur-[60px] opacity-30"
                src={asset.url}
                alt={articleTitle}
            />
        </div>
    );
};

export default SingleArticleBySlug;
