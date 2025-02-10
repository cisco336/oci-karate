import { gql } from 'graphql-request';

export const getSingleArticleBySlug = gql`
  query Article($slug: String!) {
    articleSchema(where: { slug: $slug }) {
      articleTitle
      createdAt
      updatedAt
      tag
      asset {
        url
      }
      images {
        url
      }
      articleContent {
        html
      }
    }
  }
`;
