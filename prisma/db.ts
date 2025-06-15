import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma";

export const db = (env: Env) => {
  const url = env.LIBSQL_DATABASE_URL?.trim();
  if (url === undefined) {
    throw new Error("LIBSQL_DB_URL env var is not defined");
  }

  const authToken = env.TURSO_AUTH_TOKEN?.trim();
  if (authToken === undefined) {
    throw new Error("LIBSQL_DB_AUTH_TOKEN env var is not defined");
  }
  const adapter = new PrismaLibSQL({
    url: env.TURSO_DATABASE_URL,
    authToken,
  });
  return new PrismaClient({ adapter });
};
