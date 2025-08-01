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
  import type { Direction } from "$api/backend";

  interface Filters {
    page: string;
    symbol: string;
    from?: string;
    to?: string;
    direction: Direction | "";
  }

  interface Props {
    filters: Filters;
    resetAndLoad: () => Promise<void>;
  }

  const { filters, resetAndLoad }: Props = $props();
  let value: DateRange = $state({
    start: filters?.from ? parseDate(filters.from) : undefined,
    end: filters?.to ? parseDate(filters.to) : undefined,
  });
  let symbol = $state(filters?.symbol ?? "ALL");
  let direction = $state(filters?.direction ?? "ALL");

  const debouncedSearch = _.debounce(async () => {
    const query = {
      page: "1",
      limit: "15",
      direction: direction === "ALL" ? "" : direction,
      symbol: symbol !== "ALL" ? String(symbol ?? "") : "",
      from: value.start ? String(value.start?.toString()) : undefined,
      to: value.end ? String(value.end?.toString()) : undefined,
    };
    const searchParams = new URLSearchParams({
      ...(_.omitBy(query, (v) => v === undefined || v === "") as Record<
        string,
        string
      >),
    });
    await goto(`transcation?${searchParams.toString()}`, {
      replaceState: true,
    });
    await resetAndLoad();
  }, 750);

  $effect(() => {
    if (symbol || value.start || value.end || direction) debouncedSearch();
  });

  const cryptoOptions = ["ALL", ...options.map((item) => item.label)];

  const directionOptions = [
    {
      label: "ALL",
      value: "ALL",
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
