import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const loadedTypes = loadFilesSync(
  path.join(__dirname, "schema/**/*.typeDefs.js")
);
const laodedResolvers = loadFilesSync(
  path.join(__dirname, "schema/**/*.{queries,mutations}.js")
);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(laodedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
