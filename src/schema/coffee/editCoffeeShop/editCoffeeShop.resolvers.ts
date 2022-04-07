import { Resolvers } from "../../../types";
import { idObjUtils, tagsSeperatorUtils, uploadUtils } from "../../../utils";
import { protectedResolver } from "../../user/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, categories, photoFiles },
        { loggedInUser, client }
      ) => {
        try {
          // check owner of post
          const owner = await client.coffeeShop.findFirst({
            where: { id, userId: loggedInUser.id },
            include: {
              categories: true,
              photos: true,
            },
          });

          if (!owner) {
            return { ok: false, error: "you are not a owner of coffeshop" };
          }

          await client.coffeeShop.update({
            where: { id },
            data: {
              name,
              latitude,
              longitude,
              photos: photoFiles && {
                deleteMany: {},
                create: await photoFiles.map((file) => ({
                  url: uploadUtils(file),
                })),
              },
              categories: categories && {
                disconnect: await idObjUtils(owner.categories),
                connectOrCreate: await tagsSeperatorUtils(categories),
              },
            },
          });
          return { ok: true };
        } catch (e) {
          return { ok: false, error: "can not edit coffeeshop" };
        }
      }
    ),
  },
};

export default resolvers;
