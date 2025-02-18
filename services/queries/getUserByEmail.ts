import { gql } from 'graphql-request';

export const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: userModel(where: { email: $email }, stage: DRAFT) {
      id
      activated
      password
      agreedTerms
      personalData {
        id
        idType
        names
        lastNames
        birthday
        idNumber
        phone
      }
      karateData {
        id
        cinturon
        dan
        kyu
      }
    }
  }
`;
