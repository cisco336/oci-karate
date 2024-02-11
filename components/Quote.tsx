import { iQuote } from '@/models/gqlModels';
import React from 'react';

const Quote = (props: iQuote) => {
    const { content, author } = props?.quoteSchema;
    return (
        <div
            className="flex flex-col p-2
            max-w-[30rem] border-l-4">
            <i className="font-thin">{content}</i>
            <div className="flex justify-end py-2">
                {author.map((a) => (
                    <p>{a}</p>
                ))}
            </div>
        </div>
    );
};

export default Quote;
