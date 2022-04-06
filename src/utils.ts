import { createWriteStream } from "fs";
import bcrypt from "bcrypt";

export const uploadUtils = ({ file }) => {
  const { filename, createReadStream } = file;
  const newFilename = `${Date.now()}-${filename}`;
  const stream = createReadStream();
  const out = createWriteStream(process.cwd() + "/uploads/" + newFilename);
  stream.pipe(out);
  return `http://192.168.0.11:4000/static/${newFilename}`;
};

export const hashUtils = (pw) => bcrypt.hash(pw, 10);

export const tagsSeperatorUtils = (texts) => {
  const tags = texts.match(/#[\w]+/g) || [];
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