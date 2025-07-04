<script lang="ts">
  import { ArrowBigLeft, ArrowBigRight } from "@lucide/svelte";
  import dayjs from "dayjs";

  let { latestTransactions } = $props();
</script>

<section class="bg-gray-50 rounded-2xl p-4 mb-4 font-bold text-center">
  <h1 class="text-2xl text-left">最新交易</h1>
  <div class="max-w-[500px] mx-auto mt-4">
    {#each latestTransactions as transaction}
      <div
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
              {#if transaction.type === "BUY"}
                <ArrowBigLeft size="24" color="red" />
              {:else}
                <ArrowBigRight size="24" color="green" />
              {/if}
            </span>
            <div class="text-sm text-gray-400">{transaction.amount} unit</div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
