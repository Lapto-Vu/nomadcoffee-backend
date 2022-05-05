import { Resolvers } from "../../../types";

const resolvers: Resolvers = {
  Query: {
    searchCoffeeShop: async (_, { keyword, page }, { client }) => {
      const coffeeShop = await client.coffeeShop.findMany({
        where: {
          OR: [
            { name: { contains: keyword } },
            { categories: { some: { name: { contains: keyword } } } },
          ],
        },
        skip: page ? page : 0,
        take: 20,
        include: { photos: true, user: true },
      });
      return coffeeShop;
    },
  },
};

export default resolvers;
