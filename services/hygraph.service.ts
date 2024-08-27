import { GraphQLClient, gql } from 'graphql-request';

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
            htmlContent
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
                json
            }
            htmlContent
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

export async function getData<T>(
    query: string,
    parameters?: {
        slug?: string;
        tag?: string[];
    }
): Promise<T> {
    const data = await graphConnect.request<T>(query, parameters);

    return data;
}
