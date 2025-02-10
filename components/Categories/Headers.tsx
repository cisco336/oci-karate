import React from 'react';
import Card from '../shared/Card/Card';
import { ArticleType } from '@/@types';

export const Headers = ({ data }: { data: ArticleType[] }) => {
  return (
    <div className="grid md:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] md:gap-4 md:p-8">
      <h1 className="col-[1/-1] row-[1] mb-10">Categorías</h1>
      {data.map((article: ArticleType) => (
        <Card
          key={article.slug}
          {...article}
          link={`/category/${article.category?.[0]}?slug=${article.slug}`}
        />
      ))}
    </div>
  );
};
