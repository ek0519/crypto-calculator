<script lang="ts">
  let { holdings } = $props();
</script>

<section class="bg-gray-50 rounded-2xl p-4 mb-4 font-bold text-center">
  <h1 class="text-xl text-left">持幣分佈</h1>
  <div class="max-w-[500px] mx-auto mt-4">
    {#each holdings as holding}
      <div class="flex justify-between items-center border-b border-gray-200">
        <div class="text-left">
          <div class="text-lg">{holding.symbol}</div>
          <div class="text-sm text-gray-400">{holding.amountCount} unit</div>
        </div>
        <div class="text-right">
          <div class="text-lg">$ {holding.totalValue.toFixed(4)}</div>
          <div class="text-sm text-gray-400">{holding.percentage * 100} %</div>
        </div>
      </div>
    {/each}
  </div>
</section>
