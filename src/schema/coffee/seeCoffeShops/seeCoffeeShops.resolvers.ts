import { Resolvers } from "../../../types";

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: async (_, { page }, { client }) => {
      const data = await client.coffeeShop.findMany({
        skip: page === 78 ? 0 : page,
        take: page === 78 ? 15 : 4,
        include: { photos: true, categories: true, user: true },
        orderBy: {
          id: "desc",
        },
      });
      return data;
    },
    seeCoffeeShop: async (_, { id }, { client }) => {
      try {
        const coffeeShop = await client.coffeeShop.findUnique({
          where: { id },
          include: { categories: true, photos: true, user: true },
        });
        return { ok: true, coffeeShop };
      } catch (e) {
        return { ok: false, error: "can not get a coffeeshop" };
      }
    },
  },
};

export default resolvers;
