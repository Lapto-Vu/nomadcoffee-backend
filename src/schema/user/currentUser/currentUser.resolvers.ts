import { Resolvers } from "../../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    currentUser: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
        if (!loggedInUser) {
          return { ok: false, error: "토큰이 없거나 알맞지 않습니다." };
        } else {
          return { ok: true, user: loggedInUser };
        }
      } catch {
        return {
          ok: false,
          error: "서버에 문제가 있습니다. 다시 접속해 주세요.",
        };
      }
    }),
  },
};

export default resolvers;
