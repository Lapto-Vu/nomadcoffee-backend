import client from "../../../client";
import { protectedResolver } from "../../../utils";

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
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
