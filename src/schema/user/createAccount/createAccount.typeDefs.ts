import { gql } from "apollo-server-core";

export default gql`
  type createAccountRequest {
    ok: Boolean!
    error: String
    type: String
  }

  type Mutation {
    createAccount(
      username: String!
      name: String!
      email: String!
      password: String!
      location: String
      githubUsername: String
    ): createAccountRequest
  }
`;
