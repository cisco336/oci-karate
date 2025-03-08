import { gql } from 'graphql-request';

export const userFrgament = gql`
  fragment user on UserModel {
    id
    activated
    password
    agreedTerms
  }
`;

export const personalDataFrgament = gql`
  fragment personalData on UserModel {
    personalData {
      id
      idType
      names
      lastNames
      birthday
      idNumber
      phone
    }
  }
`;

export const karateDataFrgament = gql`
  fragment karateData on UserModel {
    karateData {
      id
      cinturon
      dan
      kyu
    }
  }
`;
