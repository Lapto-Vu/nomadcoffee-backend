import client from "../../../client";
import { Resolvers } from "../../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { id }) =>
      client.user.findUnique({
        where: { id },
        include: {
          followers: true,
          following: true,
        },
      }),
  },

  User: {
    totalFollowing: ({ id }) =>
      client.user.count({ where: { followers: { some: { id } } } }),
    totalFollowers: ({ id }) =>
      client.user.count({ where: { following: { some: { id } } } }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
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
  },
};

export default resolvers;
