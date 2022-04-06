import { gql } from "apollo-server-core";

export default gql`
  type seeCoffeeShopsResult {
    ok: Boolean!
    error: String
    coffeeShop: [CoffeeShop]
  }

  type seeCoffeeShopResult {
    ok: Boolean!
    error: String
    coffeeShop: CoffeeShop
  }
  type Query {
    seeCoffeeShops(lastId: Int): seeCoffeeShopsResult
    seeCoffeeShop(id: Int!): seeCoffeeShopResult
  }
`;
