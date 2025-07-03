import { env } from "$env/dynamic/private";
import type { Handle } from "@sveltejs/kit";
import jwt from "@tsndr/cloudflare-worker-jwt";

export interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

export const getUserProfile = async (accessToken: string) => {
  const jwtData = (await jwt.verify(accessToken, env.JWT_SECRET)) as {
    payload: JwtPayload;
  };
  if (!jwtData) return null;
  const { payload } = jwtData;
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) {
    return null;
  }
  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
  };
};

const passPaths = new Set([
  "/",
  "/.well-known/appspecific/com.chrome.devtools.json",
  "/login",
]);

export const handle: Handle = async ({ event, resolve }) => {
  const accessToken = event.cookies.get("access_token");
  const user = accessToken ? await getUserProfile(accessToken) : null;
  event.locals.user = user;
  if (passPaths.has(event.url.pathname) || user) {
    return await resolve(event);
  }
  return Response.redirect(`${event.url.origin}/login`, 303);
};
