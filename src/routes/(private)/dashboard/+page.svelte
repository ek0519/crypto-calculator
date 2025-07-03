<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { dashboard } from "../../../api/backend.js";
  import { binanceFetchPrices } from "../../../api/binance.js";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let dashboardData = $state({
    portfolioTotal: 0,
    coinDistribution: [
      {
        symbol: "",
        amountCount: 0,
        totalValue: 0,
      },
    ],
    latestTransactions: [
      {
        symbol: "",
        id: "",
        amount: 0,
        price: 0,
        userId: "",
      },
    ],
  });

  $effect(() => {
    (async () => {
      try {
        const r = await dashboard(data.access_token);
        if (r) dashboardData = r;
        const pirces = await binanceFetchPrices();
        console.log(pirces);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    })();
  });
</script>

<Tabs.Root value="dashboard" class="w-[400px]">
  <Tabs.List>
    <Tabs.Trigger value="dashboard">Dashboard</Tabs.Trigger>
    <Tabs.Trigger value="transcation">Transcation</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="dashboard">
    {dashboardData.portfolioTotal}
    Make changes to your dashboard here.
  </Tabs.Content>
  <Tabs.Content value="transcation">Change your password here.</Tabs.Content>
</Tabs.Root>
