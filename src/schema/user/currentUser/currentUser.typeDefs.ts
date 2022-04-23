import { gql } from "apollo-server-core";

export default gql`
  type currentUserRequest {
    ok: Boolean!
    error: String
    user: User
  }
  type Query {
    currentUser: currentUserRequest
  }
`;
