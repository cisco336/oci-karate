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
