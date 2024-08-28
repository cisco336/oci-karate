'use client';
import React, { useState } from 'react';
import { iArticle } from '../shared/Card';
import { Button, buttonVariants } from '../shared/Button';
import Link from 'next/link';

export const ArticlesList = ({ articles }: { articles: iArticle[] }) => {
    const [isLoading, setLoading] = useState(false);
    return (
        <ul className="px-16 flex flex-col gap-6">
            {articles.map((article) => (
                <li className="flex gap-2 rounded-lg border overflow-hidden items-center">
                    <img
                        className="object-cover max-w-32"
                        src={article.asset?.url}
                        alt={article.articleTitle}
                    />
                    <div className="flex flex-col">
                        <h3>{article.articleTitle}</h3>
                        <p>{article.abstract}</p>
                    </div>
                    <span className="flex w-full justify-end pr-8">
                        <Link href={`/slug/${article.slug}`}>
                            <Button
                                click={() => setLoading(true)}
                                variant={buttonVariants.Ghost}
                                loading={isLoading}>
                                Ver artículo
                            </Button>
                        </Link>
                    </span>
                </li>
            ))}
        </ul>
    );
};
