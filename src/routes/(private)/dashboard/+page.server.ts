export const load = async ({ cookies }) => {
  const access_token = cookies.get("access_token") ?? "";
  return {
    access_token,
  };
};
