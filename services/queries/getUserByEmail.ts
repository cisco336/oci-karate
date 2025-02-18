import { gql } from 'graphql-request';
import {
  karateDataFrgament,
  personalDataFrgament,
  userFrgament,
} from '../fragments/fragments';

export const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: userModel(where: { email: $email }, stage: DRAFT) {
      ...user
      ...personalData
      ...karateData
    }
  }
  ${userFrgament}
  ${personalDataFrgament}
  ${karateDataFrgament}
`;
