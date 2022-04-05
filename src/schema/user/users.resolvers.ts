import { Resolvers } from "../../types";

const resolver: Resolvers = {
  User: {
    totalFollowing: ({ id }, _, { client }) =>
      client.user.count({ where: { followers: { some: { id } } } }),
    totalFollowers: ({ id }, _, { client }) =>
      client.user.count({ where: { following: { some: { id } } } }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exits = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });

      return Boolean(exits);
    },
    following: ({ id }, { lastId }, { client }) =>
      client.user.findMany({
        where: { following: { some: { id } } },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
    followers: ({ id }, { lastId }, { client }) =>
      client.user.findMany({
        where: { followers: { some: { id } } },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

export default resolver;
