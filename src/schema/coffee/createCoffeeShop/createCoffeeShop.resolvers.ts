import { Resolvers } from "../../../types";
import { tagsSeperatorUtils, uploadUtils } from "../../../utils";
import { protectedResolver } from "../../user/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photoFiles, categories },
        { loggedInUser, client }
      ) => {
        try {
          await client.coffeeShop.create({
            data: {
              user: {
                connect: {
                  username: loggedInUser.username,
                },
              },
              name,
              latitude,
              longitude,
              photos: {
                create:
                  photoFiles &&
                  (await photoFiles.map((file) => ({
                    url: uploadUtils(file),
                  }))),
              },
              categories: {
                connectOrCreate:
                  categories && (await tagsSeperatorUtils(categories)),
              },
            },
          });
          return { ok: true };
        } catch (e) {
          return {
            ok: false,
            error: `error happend, can not create coffeShop`,
          };
        }
      }
    ),
  },
};

export default resolvers;
