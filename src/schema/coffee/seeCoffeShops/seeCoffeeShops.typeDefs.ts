import { gql } from "apollo-server-core";

export default gql`
  type seeCoffeeShopResult {
    ok: Boolean!
    error: String
    coffeeShop: CoffeeShop
  }
  type Query {
    seeCoffeeShops(page: Int): [CoffeeShop]
    seeCoffeeShop(id: Int!): seeCoffeeShopResult
  }
`;
