import { Resolvers } from "../../../types";

const resolvers: Resolvers = {
  Query: {
    seeCategory: async (_, { tag, lastId }, { client }) => {
      try {
        const coffeeShop = await client.coffeeShop.findMany({
          where: { categories: { some: { name: tag } } },
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
        return { ok: true, coffeeShop };
      } catch (e) {
        return { ok: false, error: "can not get category by tag" };
      }
    },
    seeCategories: (_, { lastId }, { client }) => {
      try {
        const categories = client.category.findMany({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
        return { ok: true, categories };
      } catch (e) {
        return { ok: false, error: "can not get categories" };
      }
    },
  },
};

export default resolvers;
