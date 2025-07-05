<script lang="ts">
  import Holding from "$lib/dashboard/holding.svelte";
  import Price from "$lib/dashboard/price.svelte";
  import Transcation from "$lib/dashboard/transcation.svelte";
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

<div class="bg-blue-400 h-full">
  <div class="rounded-2xl px-4 py-6">
    <Price {realTimeTotalPrice} {portfolioTotal} {realTimePriceColor} />
    <Holding {holdings} />
    <Transcation {latestTransactions} />
  </div>
</div>
