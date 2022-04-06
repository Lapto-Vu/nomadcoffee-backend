import { gql } from "apollo-server-core";

export default gql`
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String
    longitude: String
    photos: [CoffeeShopPhoto]
    categories: [Category]
    user: User
    createdAt: String
    updatedAt: String
  }

  type CoffeeShopPhoto {
    id: Int!
    url: String
    shop: CoffeeShop
  }

  type Category {
    id: Int!
    name: String
    slug: String
    shops: [CoffeeShop]
    totalShops: Int
  }
`;
