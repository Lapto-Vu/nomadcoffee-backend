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
        const uploadFile = ({ file }) => {
          const { filename, createReadStream } = file;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const stream = createReadStream();
          const out = createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          stream.pipe(out);
          return `http://192.168.0.11:4043/static/${newFilename}`;
        };
        const hashed = (pw) => bcrypt.hash(pw, 10);

        const updated = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            name,
            email,
            location,
            avatarURL: avatarURL && (await uploadFile(avatarURL)),
            password: newPassword && (await hashed(newPassword)),
          },
        });

        return updated ? { ok: true } : { ok: false, error: "not updated" };
      }
    ),
  },
};

export default resolvers;
