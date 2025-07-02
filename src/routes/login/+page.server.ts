import { env } from "$env/dynamic/private";
import { type Actions, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, cookies }) => {
  const accessToken = url.searchParams.get("access_token");
  if (accessToken) {
    cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 1 month
    });
    return redirect(303, "/dashboard");
  }
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = data.get("email")?.toString();
    if (!email) return fail(400, { email, incorrect: true });
    const apiUrl = env.API_URL;

    // 向外部 API 發送登入請求
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      credentials: "include", // 確保接收 API 返回的 cookie
    });

    if (!response.ok) {
      return fail(401, { error: "Email was invalid" });
    }

    // const { token } = (await response.json()) as { token: string };

    // // 設置 HTTP-only cookie
    // cookies.set("access_token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   path: "/",
    //   maxAge: 60 * 60, // 1 小時
    // });

    return redirect(303, "/login?success=true");
  },
};
