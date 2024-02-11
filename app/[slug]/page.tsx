import {
    getServerSideProps,
    getSingleArticleBySlug,
} from '@/services/hygraph.service';
import React from 'react';
import parse from 'html-react-parser';

const SingleArticleBySlug = async ({ params }: any) => {
    const { articleSchema } = await getServerSideProps(getSingleArticleBySlug, {
        slug: params?.slug,
    });
    const {
        articleTitle,
        createdAt,
        updatedAt,
        tag,
        asset,
        images,
        articleContent,
    } = articleSchema;
    const content = parse(articleContent.html);
    return (
        <div className="p-[2rem] max-w-[600px]">
            <h1 className="text-6xl mb-[2rem] font-thin">{articleTitle}</h1>
            {content}
        </div>
    );
};

export default SingleArticleBySlug;
