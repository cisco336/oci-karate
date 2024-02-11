import { GraphQLClient, RequestOptions, gql } from 'graphql-request';

const url = `${process.env.HYGRAPH_URL}`;
const graphConnect = new GraphQLClient(url);

export const articlesQuery = gql`
    query Articles {
        articleSchemas {
            id
            articleTitle
            createdAt
            slug
            updatedAt
            abstract
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

export const articlesByTagQuery = gql`
    query Articles($tag: [Tags!]) {
        articleSchemas(where: { tag_contains_all: $tag }) {
            id
            articleTitle
            createdAt
            slug
            updatedAt
            abstract
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

export const quoteQueryBySlug = gql`
    query Quote($slug: String!) {
        quoteSchema(where: { slug: $slug }) {
            author
            content
        }
    }
`;

export async function getServerSideProps(query: string, parameters?: {}) {
    const data = await graphConnect.request<any>(query, parameters);

    return data;
}
