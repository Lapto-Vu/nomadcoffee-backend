require("dotenv").config();
import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./schema/user/users.utils";
import client from "./client";

const PORT = process.env.PORT;

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    introspection: true,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        client,
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await apollo.start();

  app.use("/static", express.static("uploads"));
  app.use(graphqlUploadExpress());

  apollo.applyMiddleware({ app, path: "/" });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server is Running on PORT :` + PORT);
}

startApolloServer();
