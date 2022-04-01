import { createWriteStream } from "fs";
import { Resolvers } from "../../../types";
import bcrypt from "bcrypt";
import { protectedResolver } from "../../../utils";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { name, email, location, avatarURL, password: newPassword },
        { loggedInUser, client }
      ) => {
        let newURL = null;
        if (avatarURL) {
          const { filename, createReadStream } = await avatarURL;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          readStream.pipe(writeStream);
          newURL = `http://localhost:4000/static/${newFilename}`;
        }
        const hashed = (pw) => bcrypt.hash(pw, 10);

        const updated = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            name,
            email,
            location,
            ...(avatarURL && { avatar: newURL }),
            password: newPassword && (await hashed(newPassword)),
          },
        });

        return updated ? { ok: true } : { ok: false, error: "not updated" };
      }
    ),
  },
};

export default resolvers;
