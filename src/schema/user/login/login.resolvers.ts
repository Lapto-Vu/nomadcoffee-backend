import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resolvers } from "../../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      try {
        const user = await client.user.findFirst({ where: { username } });

        if (!user) {
          return {
            ok: false,
            error: "해당하는 아이디는 없습니다.",
            type: "username",
          };
        }

        const check = await bcrypt.compare(password, user.password);

        if (!check) {
          return {
            ok: false,
            error: "비밀번호를 잘못 입력했습니다.",
            type: "password",
          };
        }

        const token = await jwt.sign(
          { id: user.id, name: user.username },
          process.env.SECRET_KEY
        );

        return { ok: true, token };
      } catch {
        return {
          ok: false,
          type: "internal",
          error: "서버에 문제가 있습니다. 다시 접속해주세요.",
        };
      }
    },
  },
};

export default resolvers;
