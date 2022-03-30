import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, name, email, password, location, githubUsername }
    ) => {
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
    },
  },
};
