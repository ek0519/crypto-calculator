<script lang="ts">
  import { Bitcoin } from "@lucide/svelte";
  import * as Form from "$lib/components/ui/form/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { formSchema, type FormSchema } from "./schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { options } from "../../config/crypto";
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  let {
    data,
    title,
  }: { data: { form: SuperValidated<Infer<FormSchema>> }; title: string } =
    $props();
  console.log(data.form);
  const form = superForm(data.form, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = form;
  console.log(formData);

  let value = $state(today(getLocalTimeZone()));
  let symbol = $state(options[0].label);
  const triggerContent = $derived(
    options.find((item) => item.label === symbol)?.label,
  );
</script>

<section class="bg-gray-50 rounded-2xl p-4 mb-4 font-bold text-center">
  <h1 class="text-xl text-left">{title}</h1>
  <form method="POST" use:enhance>
    <Form.Field {form} name="symbol">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>
            <Bitcoin class="w-1/4" color="orange" size="24" />
          </Form.Label>
          <Select.Root type="single" {...props} bind:value={symbol}>
            <Select.Trigger class="w-full text-right"
              >{triggerContent}</Select.Trigger
            >
            <Select.Content>
              {#each options as option (option)}
                <Select.Item
                  label={option.label}
                  value={option.label}
                  class="cursor-pointer hover:bg-gray-700"
                >
                  {option.label}
                </Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        {/snippet}
      </Form.Control>
      <Form.Description>This is your public display name.</Form.Description>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="purchaseDate">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>交易日期</Form.Label>
          <Calendar
            {...props}
            type="single"
            bind:value
            class="rounded-md border shadow-sm w-full "
            captionLayout="dropdown"
          />
        {/snippet}
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="price">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>交易價格</Form.Label>
          <Input
            {...props}
            type="number"
            placeholder="交易價格"
            class="w-full"
          />
        {/snippet}
      </Form.Control>
      <Form.Description>交易價格</Form.Description>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="amount">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>交易數量</Form.Label>
          <Input
            {...props}
            type="number"
            placeholder="交易數量"
            class="w-full"
          />
        {/snippet}
      </Form.Control>
      <Form.Description>交易數量</Form.Description>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Button>Submit</Form.Button>
  </form>
</section>
