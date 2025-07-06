<script lang="ts">
  import Holding from "$lib/dashboard/holding.svelte";
  import Price from "$lib/dashboard/price.svelte";
  import Transcation from "$lib/dashboard/transcation.svelte";
  import type { TransactionType } from "$type/transaction";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  const { latestTransactions, realTimeTotalPrice, portfolioTotal, holdings } =
    data;
  const realTimePriceColor = $derived.by(() => {
    if (!realTimeTotalPrice || !portfolioTotal) return "text-gray-500";
    return realTimeTotalPrice > portfolioTotal
      ? "text-green-500"
      : "text-red-500";
  });
</script>

<div class="rounded-2xl px-4 mb-16">
  <Price {realTimeTotalPrice} {portfolioTotal} {realTimePriceColor} />
  <Holding {holdings} />
  <Transcation
    title={"最新交易"}
    latestTransactions={latestTransactions as TransactionType[]}
  />
</div>
