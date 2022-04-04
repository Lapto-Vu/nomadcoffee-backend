import bcrypt from "bcrypt";
import { Resolvers } from "../../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, name, email, password, location, githubUsername },
      { client }
    ) => {
      try {
        const exit = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });

        if (exit) {
          return { ok: false, error: "username or email is already taken" };
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            username,
            name,
            email,
            location,
            githubUsername,
            password: hashPassword,
          },
        });

        return { ok: true };
      } catch (e) {
        return { ok: false, error: "Can not create account" };
      }
    },
  },
};

export default resolvers;
