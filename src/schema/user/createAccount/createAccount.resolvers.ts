import { Resolvers } from "../../../types";
import { hashUtils } from "../../../utils";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, name, email, password, location, githubUsername },
      { client }
    ) => {
      try {
        const emailExit = await client.user.findFirst({
          where: { email },
        });

        if (emailExit) {
          return {
            ok: false,
            error: "해당 이메일은 이미 사용중입니다.",
            type: "email",
          };
        }

        const usernameExit = await client.user.findFirst({
          where: { username },
        });

        if (usernameExit) {
          return {
            ok: false,
            error: "해당 아이디는 이미 사용중입니다.",
            type: "username",
          };
        }

        await client.user.create({
          data: {
            username,
            name,
            email,
            location,
            githubUsername,
            password: await hashUtils(password),
          },
        });

        return { ok: true };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "서버에 문제가 있습니다. 다시 접속해주세요.",
          type: "internal",
        };
      }
    },
  },
};

export default resolvers;
