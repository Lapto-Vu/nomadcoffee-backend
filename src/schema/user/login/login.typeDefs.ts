import { gql } from "apollo-server-core";

export default gql`
  type loginRequest {
    ok: Boolean!
    type: String
    error: String
    token: String
  }

  type Mutation {
    login(username: String!, password: String!): loginRequest
  }
`;
