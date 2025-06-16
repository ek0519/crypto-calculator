import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "../generated/prisma";

export const db = (env: Env) => {
  const url = env.TURSO_DATABASE_URL?.trim();
  if (url === undefined) {
    throw new Error("TURSO_DATABASE_URL env var is not defined");
  }

  const authToken = env.TURSO_AUTH_TOKEN?.trim();
  if (authToken === undefined) {
    throw new Error("TURSO_AUTH_TOKEN env var is not defined");
  }
  const adapter = new PrismaLibSQL({
    url: env.TURSO_DATABASE_URL,
    authToken,
  });
  return new PrismaClient({ adapter });
};
