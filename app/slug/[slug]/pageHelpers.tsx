import React from 'react';
import { ArticleSegmentType, ArticleSegmentChildType } from './page';

export const RenderArticle = (articleSegment: ArticleSegmentType) => {
    switch (articleSegment.type) {
        case 'paragraph':
            return RenderParagraph(articleSegment.children);
        case 'heading-one':
            return RenderHeadingOne(articleSegment.children);
        case 'heading-two':
            return RenderHeadingTwo(articleSegment.children);
        case 'heading-three':
            return RenderHeadingThree(articleSegment.children);
        case 'unordered-list':
        case 'numbered-list':
        case 'bulleted-list':
            return RenderUL(articleSegment.children);
        case 'block-quote':
            return RenderQuote(articleSegment.children);
        default:
            break;
    }
    return <></>;
};

export const RenderQuote = (articleChild: ArticleSegmentChildType[]) => {
    return (
        <div className="w-full flex justify-end my-6">
            <blockquote className="border-l-4 border-gray-700 pl-4 flex flex-col font-thin italic">
                {articleChild.map(
                    (child: ArticleSegmentChildType, index: number) => (
                        <p key={index}>{child.text}</p>
                    )
                )}
            </blockquote>
        </div>
    );
};

export const RenderHeadingOne = (articleChild: ArticleSegmentChildType[]) => {
    return (
        <h1 className="text-6xl font-thin pb-4">
            {articleChild.map(
                (child: ArticleSegmentChildType, index: number) => (
                    <React.Fragment key={index}>{child.text}</React.Fragment>
                )
            )}
        </h1>
    );
};

export const RenderHeadingTwo = (articleChild: ArticleSegmentChildType[]) => {
    return (
        <h2 className="text-4xl font-thin pt-8 pb-6">
            {articleChild.map(
                (child: ArticleSegmentChildType, index: number) => (
                    <React.Fragment key={index}>{child.text}</React.Fragment>
                )
            )}
        </h2>
    );
};

export const RenderHeadingThree = (articleChild: ArticleSegmentChildType[]) => {
    return (
        <h3 className="text-3xl font-thin pt-6 pb-4">
            {articleChild.map(
                (child: ArticleSegmentChildType, index: number) => (
                    <React.Fragment key={index}>{child.text}</React.Fragment>
                )
            )}
        </h3>
    );
};

export const RenderLiContent = (liContent: unknown) => {
    console.log(liContent);
};

export const RenderUL = (articleChild: ArticleSegmentChildType[]) => {
    return (
        <ul className="list-disc pl-8">
            {articleChild.map(
                (child: ArticleSegmentChildType, index: number) => {
                    RenderLiContent(child);
                    return (
                        <li key={index}>
                            <></>
                        </li>
                    );
                }
            )}
        </ul>
    );
};

export const RenderParagraph = (articleChild: ArticleSegmentChildType[]) => {
    return (
        <p className="pb-4">
            {articleChild.map(
                (child: ArticleSegmentChildType, index: number) => (
                    <React.Fragment key={index}>
                        {child.bold ? (
                            <strong>{child.text}</strong>
                        ) : (
                            child.text
                        )}
                    </React.Fragment>
                )
            )}
        </p>
    );
};
