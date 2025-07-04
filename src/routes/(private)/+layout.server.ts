import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  const access_token = cookies.get("access_token") ?? "";

  return {
    user: locals.user,
    access_token,
  };
};
