<script lang="ts">
  import type { TransactionType } from "$type/transaction";
  import { ArrowBigLeft, ArrowBigRight } from "@lucide/svelte";
  import dayjs from "dayjs";

  let {
    transactions,
    title,
    total,
  }: {
    transactions: TransactionType[];
    title: string;
    total?: number;
  } = $props();
</script>

<section class="bg-gray-50 rounded-2xl p-4 font-bold text-center">
  <div class="flex items-center justify-between">
    <h1 class="text-xl text-left">{title}</h1>
    {#if total}
      <div>總筆數 {total}</div>
    {/if}
  </div>
  <div class="max-w-[500px] mx-auto mt-4">
    <div class="text-gray-500">
      {#if transactions.length === 0}
        沒有任何交易
      {/if}
    </div>
    {#each transactions as transaction}
      <a
        href="/transcation/{transaction.id}"
        class="flex justify-between items-center p-2 border-b border-gray-200"
      >
        <div class="text-left">
          <div class="text-lg">{transaction.symbol}</div>
          <div class="text-sm text-gray-400">
            {dayjs(transaction.purchaseDate).format("YYYY-MM-DD hh:mm")}
          </div>
        </div>
        <div class="text-right">
          <div class="text-lg">$ {transaction.price.toFixed(4)}</div>
          <div class="flex justify-end items-center gap-2">
            <span>
              {#if transaction.direction === "BUY"}
                <ArrowBigRight size="24" color="green" />
              {:else}
                <ArrowBigLeft size="24" color="red" />
              {/if}
            </span>
            <div class="text-sm text-gray-400">{transaction.amount} unit</div>
          </div>
        </div>
      </a>
    {/each}
  </div>
</section>
