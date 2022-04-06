import { Resolvers } from "../../../types";
import { protectedResolver } from "../users.utils";
import { hashUtils, uploadUtils } from "../../../utils";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { name, email, location, avatarURL, password: newPassword },
        { loggedInUser, client }
      ) => {
        try {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              name,
              email,
              location,
              avatarURL: avatarURL && (await uploadUtils(avatarURL)),
              password: newPassword && (await hashUtils(newPassword)),
            },
          });
          return { ok: true };
        } catch (e) {
          return { ok: false, error: "error happend, not updated" };
        }
      }
    ),
  },
};

export default resolvers;
