import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchCoffeeShop(keyword: String, page: Int): [CoffeeShop]
  }
`;
