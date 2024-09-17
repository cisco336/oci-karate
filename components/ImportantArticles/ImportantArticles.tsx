import React from 'react';
import { ArticleType } from '../shared/Card';
import Card from '../shared/Card/Card';

export const ImportantArticles = ({
  articles,
}: {
  articles: ArticleType[];
}) => {
  return (
    <div className="flex flex-wrap max-w-[1200px]">
      {articles
        .filter((article) => article?.tag?.includes('important'))
        .map((article: ArticleType) => (
          <Card
            {...article}
            key={article.id}
          />
        ))}
    </div>
  );
};
