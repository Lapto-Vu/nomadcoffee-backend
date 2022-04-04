import client from "../../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, page }) => {
      try {
        const users = await client.user.findMany({
          where: { username: { startsWith: keyword.toLowerCase() } },
          take: 5,
          skip: (page - 1) * 5,
        });
        const totalUsers = await client.user.count({
          where: { username: { startsWith: keyword.toLowerCase() } },
        });
        return { ok: true, users, totalPages: Math.ceil(totalUsers / 5) };
      } catch (e) {
        return { ok: false, error: "can not search" };
      }
    },
  },
};
