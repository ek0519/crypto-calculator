<script lang="ts">
  import Holding from "$lib/dashboard/holding.svelte";
  import Price from "$lib/dashboard/price.svelte";
  import Transcation from "$lib/dashboard/transcation.svelte";
  import type { TransactionType } from "$type/transaction";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import { dashboard } from "$api/backend";
  import { binanceFetchPrices } from "$api/binance";
  import { krakenFetchPrice } from "$api/kraken";
  import type { CryptoPrice } from "$type";
  import {
    computedRealTimeTotalPrice,
    type Holdings,
    holdings,
  } from "$api/dashboard";

  let { data }: PageProps = $props();

  let access_token = $state(data.access_token);
  let transactions = $state([] as TransactionType[]);
  let _portfolioTotal = $state("0");
  let _realTimeTotalPrice = $state("0");
  let _holdings: Holdings[] = $state([
    {
      symbol: "",
      amountCount: 0,
      totalValue: 0,
      percentage: "0",
    },
  ]);
  onMount(async () => {
    const [response, prices, croPrice] = await Promise.all([
      dashboard(access_token),
      binanceFetchPrices(),
      krakenFetchPrice("CROUSD"),
    ]);
    const realTimePrices = [
      ...prices,
      { symbol: "CROUSD", price: croPrice },
    ] as CryptoPrice[];
    if (response) {
      const { latestTransactions, portfolioTotal, coinDistribution } = response;
      const realTimeTotalPrice = computedRealTimeTotalPrice({
        realTimePrices,
        coinDistribution,
      });
      transactions = latestTransactions ?? [];
      _portfolioTotal = portfolioTotal.toFixed(4) ?? "0";
      _realTimeTotalPrice = realTimeTotalPrice.toFixed(4) ?? "0";
      _holdings = holdings({
        realTimePrices,
        coinDistribution,
        realTimeTotalPrice,
      });
    }
  });

  const realTimePriceColor = $derived.by(() => {
    if (!_realTimeTotalPrice || !_portfolioTotal) return "text-gray-500";
    return _realTimeTotalPrice > _portfolioTotal
      ? "text-green-500"
      : "text-red-500";
  });
</script>

<div class="rounded-2xl px-4 mb-16">
  <Price
    realTimeTotalPrice={_realTimeTotalPrice}
    portfolioTotal={_portfolioTotal}
    {realTimePriceColor}
  />
  <Holding holdings={_holdings} />
  <Transcation title={"最新交易"} {transactions} />
</div>
