import { createWriteStream } from "fs";
import bcrypt from "bcrypt";

export const uploadUtils = ({ file }) => {
  const { filename, createReadStream } = file;
  const newFilename = `${Date.now()}-${filename}`;
  const stream = createReadStream();
  const out = createWriteStream(process.cwd() + "/uploads/" + newFilename);
  stream.pipe(out);
  return process.env.NODE_ENV === "production"
    ? `https://coffee-backend-lapto.herokuapp.com/static/${newFilename}`
    : `http://192.168.0.48:${process.env.PORT}/static/${newFilename}`;
};

export const hashUtils = (pw) => bcrypt.hash(pw, 10);

export const tagsSeperatorUtils = (texts) => {
  const tags = texts.match(/#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*/) || [];
  return tags.map((tag) => ({
    where: {
      name: tag.slice(1),
    },
    create: {
      name: tag.slice(1),
      slug: tag,
    },
  }));
};

export const idObjUtils = (arr) => {
  const newObj = arr.map((obj) => {
    return { id: obj.id };
  });
  return newObj;
};
