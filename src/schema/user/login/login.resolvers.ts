import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resolvers } from "../../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      const user = await client.user.findFirst({ where: { username } });

      if (!user) {
        return { ok: false, error: "username is wrong or misspelled" };
      }

      const check = await bcrypt.compare(password, user.password);

      if (!check) {
        return { ok: false, error: "password is wrong!" };
      }

      const token = await jwt.sign(
        { id: user.id, name: user.username },
        process.env.SECRET_KEY
      );

      return { ok: true, token };
    },
  },
};

export default resolvers;
