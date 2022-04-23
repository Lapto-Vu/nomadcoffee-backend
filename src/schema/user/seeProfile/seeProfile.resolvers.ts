import { Resolvers } from "../../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { id }, { client }) => {
      try {
        const user = await client.user.findUnique({
          where: { id },
          include: {
            followers: true,
            following: true,
          },
        });
        if (!user) {
          return { ok: false, error: "원하는 유저가 없습니다." };
        } else {
          return { ok: true, user };
        }
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "서버에 문제가 있습니다. 다시 접속하시기 바랍니다.",
        };
      }
    },
  },
};

export default resolvers;
