import { gql } from 'graphql-request';

export const GetUserWithChildren = gql`
  query GetUserWithChildren($id: ID!) {
    user: userModel(where: { id: $id }) {
      id
      names
      lastNames
      children {
        id
        names
        lastNames
        email
      }
    }
  }
`;
