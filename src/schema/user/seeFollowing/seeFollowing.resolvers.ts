import client from "../../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      try {
        const exits = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!exits) {
          return {
            ok: false,
            error: "User not found",
          };
        }
        const following = await client.user
          .findUnique({ where: { username } })
          .following({
            take: 5,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { id: lastId } }),
          });
        return {
          ok: true,
          following,
        };
      } catch (e) {
        return { ok: false, error: "can not get following" };
      }
    },
  },
};
