import { gql } from "apollo-server-core";

export default gql`
  scalar Upload
  type editProfileRequest {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      name: String
      email: String
      location: String
      avatarURL: Upload
      password: String
    ): editProfileRequest
  }
`;
