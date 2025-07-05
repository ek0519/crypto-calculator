<script lang="ts">
  import type { PageProps } from "./$types";
  import Transcation from "$lib/dashboard/transcation.svelte";
  import type { TransactionType } from "$type/transaction";
  import Search from "@/dashboard/search.svelte";
  let { data }: PageProps = $props();
  let filters = $state(data.filters);
  let limit = $state(data.limit);
  let transactions = $derived(data.transactions);
</script>

<div class="rounded-b-2xl px-4">
  <Search {filters} {limit} />
  <Transcation
    title={"交易紀錄"}
    latestTransactions={transactions as TransactionType[]}
  />
</div>
