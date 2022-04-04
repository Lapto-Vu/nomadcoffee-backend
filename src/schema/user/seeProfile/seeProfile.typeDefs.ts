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
    followers: [User]
    following: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    createdAt: String
    updatedAt: String
  }

  type Query {
    seeProfile(id: Int!): User
  }
`;
