import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies, locals }) => {
  cookies.delete("access_token", {
    path: "/",
  });
  locals.user = null;
  throw redirect(302, "/");
};
