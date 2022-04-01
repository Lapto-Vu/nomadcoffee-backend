import { gql } from "apollo-server-core";

export default gql`
  type editProfileRequest {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      name: String
      email: String
      location: String
      avatarURL: String
      password: String
    ): editProfileRequest
  }
`;
