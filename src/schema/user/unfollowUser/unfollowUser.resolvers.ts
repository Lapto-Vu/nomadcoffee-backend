import { Resolvers } from "../../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser }, { client }) => {
        try {
          const exits = await client.user.findFirst({ where: { username } });
          if (!exits) {
            return { ok: false, error: "Can not find That User" };
          }

          await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              following: {
                disconnect: {
                  username,
                },
              },
            },
          });
          return { ok: true };
        } catch (e) {
          return { ok: false, error: "Can not unfollow" };
        }
      }
    ),
  },
};

export default resolvers;
