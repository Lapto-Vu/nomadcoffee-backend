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
        const exit = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });

        if (exit) {
          return { ok: false, error: "username or email is already taken" };
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
        return { ok: false, error: "Can not create account" };
      }
    },
  },
};

export default resolvers;
