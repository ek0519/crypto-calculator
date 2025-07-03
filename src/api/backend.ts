import { env } from "$env/dynamic/public";
import { treaty } from "@elysiajs/eden";

import type { App } from "../../../crypto-backend/src/app";

const client = treaty<App>(env.PUBLIC_API_URL);

export const dashboard = async (access_token: string) => {
  const response = await client.dashboard.get({
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.data;
};
