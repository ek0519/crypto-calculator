import type { Handle } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export const getUserProfile = async (accessToken: string) => {
  const apiUrl = env.API_URL;
  const response = await fetch(`${apiUrl}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { data } = await response.json();
  return data;
};

export const handle: Handle = async ({ event, resolve }) => {
  console.log(event.locals.user);

  return await resolve(event);
};
