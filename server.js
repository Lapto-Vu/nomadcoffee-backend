require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({ schema });
const PORT = process.env.PORT;

server
  .listen({ port: PORT })
  .then(() => console.log("Server is Running on PORT:", PORT));
