import { gql } from "apollo-server-core";

export default gql`
  type seeCategoryResult {
    ok: Boolean!
    error: String
    coffeeShop: [CoffeeShop]
  }

  type seeCategoriesResult {
    ok: Boolean!
    error: String
    categories: [Category]
  }

  type Query {
    seeCategory(tag: String!, lastId: String): seeCategoryResult
    seeCategories(lastId: String): seeCategoriesResult
  }
`;
