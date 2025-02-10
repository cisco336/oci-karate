import { gql } from 'graphql-request';

export const articlesByTagQueryPrivate = gql`
  query Articles($tag: [Tags!]) {
    articleSchemas(where: { tag_contains_some: $tag }) {
      id
      articleTitle
      createdAt
      slug
      updatedAt
      abstract
      tag
      category
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

export const articlesByTagQuery = gql`
  query Articles($tag: [Tags!]) {
    articleSchemas(
      where: { tag_contains_some: $tag, tag_contains_none: private }
    ) {
      id
      articleTitle
      createdAt
      slug
      updatedAt
      abstract
      tag
      category
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
