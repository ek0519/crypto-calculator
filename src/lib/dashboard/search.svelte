<script lang="ts">
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import type { DateRange } from "bits-ui";
  import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
    parseDate,
  } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import RangeCalendar from "$components/ui/range-calendar/range-calendar.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Bitcoin } from "@lucide/svelte";
  import { options } from "../../config/crypto";
  import { goto } from "$app/navigation";
  import _ from "lodash";
  import { ArrowUpDown } from "@lucide/svelte";

  const { filters } = $props();

  let value: DateRange = $state({
    start: filters?.from ? parseDate(filters.from) : undefined,
    end: filters?.to ? parseDate(filters.to) : undefined,
  });
  let symbol = $state(filters?.symbol ?? "ALL");
  let direction = $state(filters?.direction ?? null);

  const debouncedSearch = _.debounce(async () => {
    const query = new URLSearchParams({
      page: "1",
      limit: String(filters?.limit ?? "10"),
      direction: direction ? direction : "",
      symbol: symbol !== "ALL" ? String(symbol ?? "") : "",
      from: String(value.start?.toString() ?? ""),
      to: String(value.end?.toString() ?? ""),
    });
    await goto(`transcation?${query}`, { replaceState: true });
  }, 500);

  $effect(() => {
    symbol;
    value;
    direction;
    debouncedSearch();
  });

  const cryptoOptions = ["ALL", ...options.map((item) => item.label)];

  const directionOptions = [
    {
      label: "ALL",
      value: "",
    },
    {
      label: "BUY",
      value: "BUY",
    },
    {
      label: "SELL",
      value: "SELL",
    },
  ];

  const df = new DateFormatter("en-US", {
    dateStyle: "medium",
  });

  let startValue: DateValue | undefined = $state(undefined);

  const triggerContent = $derived(
    options.find((item) => item.label === symbol)?.label || "ALL",
  );

  const triggerDirectionContent = $derived(
    directionOptions.find((item) => item.label === direction)?.label || "ALL",
  );
</script>

<section>
  <div class="grid grid-cols-2 gap-2 items-center mb-4">
    <div class="flex items-center w-full">
      <Bitcoin class="w-1/4" color="orange" size="24" />
      <div class="w-3/4 bg-white rounded-sm overflow-auto">
        <Select.Root type="single" bind:value={symbol}>
          <Select.Trigger class="w-full text-right"
            >{triggerContent}</Select.Trigger
          >
          <Select.Content>
            {#each cryptoOptions as option (option)}
              <Select.Item
                label={option}
                value={option}
                class="cursor-pointer hover:bg-gray-700"
              >
                {option}
              </Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
    </div>
    <div class="flex items-center">
      <ArrowUpDown class="w-1/4" size="24" color="orange" />
      <div class="w-3/4 bg-white rounded-sm overflow-auto">
        <Select.Root type="single" bind:value={direction}>
          <Select.Trigger class="w-full text-right"
            >{triggerDirectionContent}</Select.Trigger
          >
          <Select.Content>
            {#each directionOptions as option (option)}
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
    </div>
  </div>
  <div class="grid gap-2">
    <Popover.Root>
      <Popover.Trigger
        class={cn(
          buttonVariants({ variant: "outline" }),
          !value && "text-muted-foreground",
        )}
      >
        <CalendarIcon class="mr-2 size-4" />
        {#if value && value.start}
          {#if value.end}
            {df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
              value.end.toDate(getLocalTimeZone()),
            )}
          {:else}
            {df.format(value.start.toDate(getLocalTimeZone()))}
          {/if}
        {:else if startValue}
          {df.format(startValue.toDate(getLocalTimeZone()))}
        {:else}
          Pick a date
        {/if}
      </Popover.Trigger>
      <Popover.Content class="w-auto p-0" align="start">
        <RangeCalendar
          bind:value
          onStartValueChange={(v) => {
            startValue = v;
          }}
          numberOfMonths={2}
        />
      </Popover.Content>
    </Popover.Root>
  </div>
</section>
