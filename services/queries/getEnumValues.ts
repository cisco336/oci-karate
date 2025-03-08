import { gql } from 'graphql-request';

export type GetEnumsValuesType = {
  __type: { name: string; enumValues: { name: string }[] };
};

export const getEnumValues = gql`
  query getEnums($name: String!) {
    __type(name: $name) {
      name
      enumValues {
        name
      }
    }
  }
`;
