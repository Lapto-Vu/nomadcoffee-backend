import client from "../../../client";

export default {
  Query: {
    seeFollower: async (_, { username, page }) => {
      try {
        const exits = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!exits) {
          return { ok: false, error: "can not found that user" };
        }
        const followers = await client.user
          .findUnique({ where: { username } })
          .followers({
            take: 5,
            skip: (page - 1) * 5,
          });

        const totalFollwers = await client.user.count({
          where: { following: { some: { username } } },
        });
        return {
          ok: true,
          followers,
          totalpages: Math.ceil(totalFollwers / 5),
        };
      } catch (e) {
        return { ok: false, error: "can not get followers" };
      }
    },
  },
};
