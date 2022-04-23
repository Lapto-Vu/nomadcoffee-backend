import { gql } from "apollo-server-core";

export default gql`
  scalar Upload
  type createCoffeeShopResult {
    ok: Boolean!
    error: String
    type: String
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      photoFiles: [Upload]
      categories: String
    ): createCoffeeShopResult
  }
`;
