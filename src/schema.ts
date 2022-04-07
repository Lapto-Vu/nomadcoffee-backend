import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

const loadedTypes = loadFilesSync(
  path.join(__dirname, "schema/**/*.typeDefs.*")
);
const laodedResolvers = loadFilesSync(
  path.join(__dirname, "schema/**/*.resolvers.*")
);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers: any = mergeResolvers(laodedResolvers);
