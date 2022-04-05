import { Resolvers } from "../../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectedResolver(
      async (_, { username }, { loggedInUser, client }) => {
        try {
          const exits = await client.user.findUnique({ where: { username } });
          if (!exits) {
            return { ok: false, error: "can not find that User" };
          }

          await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              following: {
                connect: {
                  username,
                },
              },
            },
          });

          return { ok: true };
        } catch (e) {
          return { ok: false, error: "Can not follow" };
        }
      }
    ),
  },
};

export default resolvers;
