import { Resolvers } from "../../../types";

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: async (_, { lastId }, { client }) => {
      try {
        const coffeeShop = await client.coffeeShop.findMany({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
        return { ok: true, coffeeShop };
      } catch (e) {
        return { ok: false, error: "can not get coffeeshops" };
      }
    },
    seeCoffeeShop: async (_, { id }, { client }) => {
      try {
        const coffeeShop = await client.coffeeShop.findUnique({
          where: { id },
        });
        return { ok: true, coffeeShop };
      } catch (e) {
        return { ok: false, error: "can not get a coffeeshop" };
      }
    },
  },
};

export default resolvers;
