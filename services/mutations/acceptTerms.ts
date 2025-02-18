import { gql } from 'graphql-request';

export const AcceptTerms = gql`
  mutation AcceptTermsOfUse($id: ID!) {
    user: updateUserModel(data: { agreedTerms: true }, where: { id: $id }) {
      agreedTerms
      email
    }
  }
`;
