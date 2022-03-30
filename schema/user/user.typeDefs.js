import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int
    username: String
    name: String
    email: String
    location: String
    avatarURL: String
    githubUsername: String
    createdAt: String
    updatedAt: String
  }

  type Response {
    ok: Boolean
    error: String
  }

  type Query {
    users: [User]
    user(id: Int!): User
  }

  type Mutation {
    createAccount(
      username: String!
      name: String!
      email: String!
      password: String!
      location: String
      githubUsername: String
    ): Response
  }
`;
