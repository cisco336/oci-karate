import { getData, getSingleArticleBySlug } from '@/services/hygraph.service';
import React from 'react';
import parse from 'html-react-parser';
import { iArticle } from '@/components/shared/Card';

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
    return (
        <div className="p-[2rem] max-w-[600px]">
            <h1 className="text-6xl mb-[2rem] font-thin">{articleTitle}</h1>
            {content}
        </div>
    );
};

export default SingleArticleBySlug;
