import dayjs from "dayjs";
import { getTransactions } from "../../../api/backend";

export const load = async ({ cookies, url }) => {
  const page = url.searchParams.get("page") ?? "1";
  const limit = url.searchParams.get("limit") ?? "10";
  const symbol = url.searchParams.get("symbol") ?? "";
  const from = url.searchParams.get("from") ?? "";
  const to = url.searchParams.get("to") ?? "";
  const response = await getTransactions({
    access_token: cookies.get("access_token") ?? "",
    page: Number(page),
    limit: Number(limit),
    symbol,
    from: from ? dayjs(from).format("YYYY-MM-DD") : undefined,
    to: to ? dayjs(to).format("YYYY-MM-DD") : undefined,
  });
  if (response) {
    return {
      transactions: response.data,
      page: response.page,
      limit: response.limit,
      totalPage: response.totalPage,
      nextPage: response.nextPage,
      filters: { symbol, from, to },
    };
  }
};
