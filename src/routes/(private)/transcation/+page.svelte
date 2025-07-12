<script lang="ts">
  import type { PageProps } from "./$types";
  import Transcation from "$lib/dashboard/transcation.svelte";
  import type { TransactionType } from "$type/transaction";
  import Search from "@/dashboard/search.svelte";
  import { page } from "$app/state";
  import { getTransactions, type Direction } from "$api/backend";
  import { onMount } from "svelte";

  let { data }: PageProps = $props();
  const url = page.url;
  let total = $state(0);
  let totalPage = $state(0);
  let nextPage = $state<number | null>(null);
  let currPage = $state(url.searchParams.get("page") ?? "1");
  let symbol = $state(url.searchParams.get("symbol") ?? "");
  let from = $state(url.searchParams.get("from") ?? undefined);
  let to = $state(url.searchParams.get("to") ?? undefined);
  let direction = $state(
    (url.searchParams.get("direction") as Direction) ?? "",
  );
  let filters = $derived({
    page: currPage,
    symbol,
    from,
    to,
    direction,
  });
  let transactions = $derived([] as TransactionType[]);

  async function loadMore({
    page,
    limit,
    symbol,
    from,
    to,
    direction,
  }: {
    page: string;
    limit: string;
    symbol: string;
    from?: string;
    to?: string;
    direction: Direction;
  }) {
    const response = await getTransactions({
      access_token: data.access_token ?? "",
      page: Number(page),
      limit: Number(limit),
      direction,
      symbol,
      from,
      to,
    });
    if (response) {
      total = response.total;
      totalPage = response.totalPage;
      nextPage = response.nextPage;
      transactions = response.data as TransactionType[];
    }
  }
  onMount(() => {
    loadMore({
      page: currPage,
      limit: "10",
      symbol,
      from,
      to,
      direction,
    });
  });
</script>

<div class="rounded-b-2xl px-4">
  <Search {filters} {loadMore} />
  <div class="mb-20 mt-4">
    <Transcation
      {total}
      title={"交易紀錄"}
      transactions={transactions as TransactionType[]}
    />
  </div>
</div>
