<script lang="ts">
  import type { PageProps } from "./$types";
  import Transcation from "$lib/dashboard/transcation.svelte";
  import type { TransactionType } from "$type/transaction";
  import Search from "@/dashboard/search.svelte";
  import { page } from "$app/state";
  import { getTransactions, type Direction } from "$api/backend";
  import { onMount } from "svelte";

  let { data }: PageProps = $props();
  let total = $state(0);
  let nextPage = $state<number | null>(null);
  let currPage = $derived(page.url.searchParams.get("page") ?? "1");
  let symbol = $derived(page.url.searchParams.get("symbol") ?? "");
  let from = $derived(page.url.searchParams.get("from") ?? undefined);
  let to = $derived(page.url.searchParams.get("to") ?? undefined);
  let direction = $derived(
    (page.url.searchParams.get("direction") as Direction) ?? "",
  );
  let filters = $derived({
    page: currPage,
    symbol,
    from,
    to,
    direction,
  });
  let transactions = $state<TransactionType[]>([]);
  let loading = $state<boolean>(false);

  async function loadMore(): Promise<void> {
    if (loading) return;
    loading = true;
    try {
      const response = await getTransactions({
        access_token: data.access_token ?? "",
        page: Number(currPage),
        limit: 15,
        direction,
        symbol,
        from,
        to,
      });
      if (response) {
        total = response.total;
        nextPage = response.nextPage;
        transactions = [
          ...transactions,
          ...(response.data as TransactionType[]),
        ];
        currPage = String(Number(currPage) + 1);
      }
    } catch (error) {
      console.error("加載數據失敗:", error);
    } finally {
      loading = false;
    }
  }

  function resetAndLoad(): Promise<void> {
    transactions = [];
    currPage = "1";
    return loadMore();
  }

  onMount(() => {
    resetAndLoad();
  });
</script>

<div class="rounded-b-2xl px-4">
  <Search {filters} {resetAndLoad} />
  <div class="mb-20 mt-4">
    <Transcation
      {total}
      title={"交易紀錄"}
      {transactions}
      {loadMore}
      hasMore={Boolean(nextPage)}
    />
  </div>
</div>
