import { gql } from 'graphql-request';

export const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail(
    $email: String!
    $password: String!
    $names: String!
    $lastNames: String!
    $birthday: String!
  ) {
    user: createUserModel(
      data: {
        email: $email
        password: $password
        personalData: {
          create: { names: $names, lastNames: $lastNames, birthday: $birthday }
        }
      }
    ) {
      id
      email
      activated
      personalData {
        names
        lastNames
        birthday
      }
    }
  }
`;
