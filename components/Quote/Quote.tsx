import { ArticleType } from '@/@types';
import parse from 'html-react-parser';
import React from 'react';

const Quote = (props: ArticleType) => {
  const content = parse(props.articleContent.html);
  return (
    <div
      className="flex flex-col p-2
            max-w-[30rem] border-l-4">
      <i className="font-thin">{content}</i>
      <div className="flex justify-end py-2">
        <p>{props.articleTitle}</p>
      </div>
    </div>
  );
};

export default Quote;
