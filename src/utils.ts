import jwt from "jsonwebtoken";
import client from "./client";
import { Resolver } from "./types";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }

    const payload: any = await jwt.verify(token, process.env.SECRET_KEY);

    if ("id" in payload) {
      const user = await client.user.findUnique({
        where: { id: payload["id"] },
      });
      if (user) {
        return user;
      }
    }

    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const protectedResolver =
  (resolver: Resolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return { ok: false, error: "please login" };
    }
    return resolver(root, args, context, info);
  };
