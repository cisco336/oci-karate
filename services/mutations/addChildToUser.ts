import { gql } from 'graphql-request';

export const addChildToUserMutation = gql`
  mutation AddChildToUser($parentId: ID!, $childId: ID!) {
    updateUserModel(
      where: { id: $parentId }
      data: { children: { connect: { id: $childId } } }
    ) {
      id
      children {
        id
        names
        lastNames
        email
      }
    }
  }
`;
