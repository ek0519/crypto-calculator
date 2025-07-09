import dayjs from "dayjs";
import { Direction, getTransactions } from "$api/backend";

export const load = async ({ cookies, url }) => {
  const page = url.searchParams.get("page") ?? "1";
  const limit = url.searchParams.get("limit") ?? "10";
  const symbol = url.searchParams.get("symbol") ?? "";
  const from = url.searchParams.get("from") ?? "";
  const to = url.searchParams.get("to") ?? "";
  const direction = (url.searchParams.get("direction") as Direction) ?? "";
  const response = await getTransactions({
    access_token: cookies.get("access_token") ?? "",
    page: Number(page),
    limit: Number(limit),
    direction,
    symbol,
    from: from ? dayjs(from).format("YYYY-MM-DD") : undefined,
    to: to ? dayjs(to).format("YYYY-MM-DD") : undefined,
  });
  if (response) {
    return {
      transactions: response.data,
      filters: {
        symbol,
        from,
        to,
        direction,
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPage: response.totalPage,
        nextPage: response.nextPage,
      },
    };
  }
};
