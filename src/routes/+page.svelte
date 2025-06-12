<script lang="ts">
  import * as Select from "$lib/components/ui/select/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  import { assets } from "$app/paths";
  import logo from "$assets/logo.png";
  import cover from "$assets/cover.jpeg";
  import { binanceFetchPrice } from "../api/binance";
  import { krakenFetchPrice } from "../api/kraken";

  const options = [
    { label: "Bitcoin", value: "BTCUSDC" },
    { label: "Ethereum", value: "ETHUSDC" },
    { label: "ADA", value: "ADAUSDC" },
    { label: "Cronos", value: "CROUSD" },
    { label: "DOT", value: "DOTUSDC" },
    { label: "XRP", value: "XRPUSDC" },
    { label: "Sonic(FTM)", value: "SUSDC" },
    { label: "SUI", value: "SUIUSDC" },
    { label: "CUSTOM", value: "" },
  ];
  const priceLevelDown = [
    { label: "-3%", value: 0.97 },
    { label: "-5%", value: 0.95 },
    { label: "-10%", value: 0.9 },
  ];

  const priceLevelUp = [
    { label: "10%", value: 1.1 },
    { label: "5%", value: 1.05 },
    { label: "3%", value: 1.03 },
  ];
  let selected = $state("");
  let price = $state(1);

  const triggerContent = $derived(
    options.find((item) => item.value === selected)?.label,
  );

  $effect(() => {
    if (selected === "CROUSD") {
      krakenFetchPrice(selected).then((r) => {
        if (r) price = r;
      });
    } else if (selected) {
      binanceFetchPrice(selected).then((r) => {
        if (r) price = r;
      });
    }
    price = 1;
  });
</script>

<svelte:head>
  <title>Crypto Price Calculator</title>
  <meta name="description" content="Calculate crypto prices with ease." />
  <meta property="og:image" content={cover} />
  <meta property="og:url" content={assets} />
  <meta property="og:title" content="crypto calculator" />
  <meta property="og:type" content="website" />
  <meta
    property="og:description"
    content="Calculate crypto prices with ease."
  />
  <meta property="og:url" content={assets} />
  <meta property="og:image:alt" content="bitcoin" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
</svelte:head>

<section>
  <div class="p-4 flex justify-center items-center">
    <img src={logo} width="200" height="200" alt="logo" />
  </div>

  {#each priceLevelUp as level (level.label)}
    <div class="flex py-2 justify-between text-green-600">
      <label class="px-2" for={level.label}>{level.label}</label>
      <div class="text-right col-span-2" id={level.label}>
        {(level.value * price).toFixed(3)}
      </div>
    </div>
  {/each}
  <div class="flex justify-between py-2 items-center">
    <label class="px-2" for="crypto">crypto</label>
    <Select.Root type="single" bind:value={selected}>
      <Select.Trigger class="w-[150px] text-right"
        >{triggerContent}</Select.Trigger
      >
      <Select.Content>
        {#each options as option (option.value)}
          <Select.Item
            label={option.label}
            value={option.value}
            class="cursor-pointer hover:bg-gray-700"
          >
            {option.label}
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </div>
  <div class="flex justify-between py-2 items-center">
    <label class="px-2" for="price">current price</label>
    <Input
      class="text-right w-[150px]"
      placeholder="Enter current price"
      type="number"
      disabled={selected !== ""}
      id="price"
      bind:value={price}
    />
  </div>
  {#each priceLevelDown as level (level.label)}
    <div class="flex justify-between py-2 items-center text-red-600">
      <label class="px-2" for={level.label}>{level.label}</label>
      <div class="text-right col-span-2" id={level.label}>
        {(level.value * price).toFixed(3)}
      </div>
    </div>
  {/each}
  <hr class="border-gray-500 border-1" />
  <div class="text-right pt-2">(USD)</div>
  <div class="text-sm text-right text-gray-400">
    price form binance and kraken
  </div>
</section>
