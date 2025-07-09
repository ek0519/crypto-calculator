<script lang="ts">
  let { realTimeTotalPrice, portfolioTotal, realTimePriceColor } = $props();
</script>

<section class="bg-gray-50 rounded-2xl p-4 mb-4 font-bold text-center">
  <div>
    <div class="flex items-center justify-center {realTimePriceColor}">
      <div class="text-xl sm:text-2xl px-4">NOW</div>
      <div class="text-2xl sm:text-4xl">
        $ {realTimeTotalPrice}
      </div>
    </div>
    <hr class="my-4" />
    <div class="flex items-center justify-center text-gray-300">
      <div class="text-2xl sm:text-4xl">
        {portfolioTotal}
      </div>
      <div class="text-xl sm:text-2xl px-4">COST</div>
    </div>
  </div>
</section>
