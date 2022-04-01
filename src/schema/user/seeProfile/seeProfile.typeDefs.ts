import { gql } from "apollo-server-core";

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

  type Query {
    seeProfile(id: Int!): User
  }
`;
