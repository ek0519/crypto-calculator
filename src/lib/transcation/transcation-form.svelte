<script lang="ts">
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
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
  import DeleteButton from "./delete-button.svelte";
  let {
    data,
    title,
    id,
  }: {
    data: { form: SuperValidated<Infer<FormSchema>> };
    title: string;
    id?: string;
  } = $props();

  const form = superForm(data.form, {
    validators: zodClient(formSchema),
  });
  const { form: formData, enhance } = form;

  let symbol = $state($formData.symbol);
  const triggerContent = $derived(
    options.find((item) => item.label === symbol)?.label,
  );
</script>

<section class="bg-gray-50 rounded-2xl p-4 mb-4 font-bold text-center">
  <div class="flex items-center justify-between">
    <h1 class="text-xl text-left">{title}</h1>
    {#if id}
      <DeleteButton {id} />
    {/if}
  </div>
  <form
    method="POST"
    action={id ? "?/update" : "?/create"}
    class="pt-4 grid gap-1"
    use:enhance
  >
    <Form.Field {form} name="symbol">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>交易幣別</Form.Label>
          <Select.Root type="single" {...props} bind:value={$formData.symbol}>
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
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="purchaseDate">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>交易日期</Form.Label>
          <Input
            class="justify-end"
            {...props}
            type="date"
            bind:value={$formData.purchaseDate}
          />
        {/snippet}
      </Form.Control>
    </Form.Field>
    <Form.Field {form} name="direction">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>交易</Form.Label>
          <RadioGroup.Root
            {...props}
            class="flex gap-4 items-center justify-end"
            bind:value={$formData.direction}
            orientation="horizontal"
          >
            <div class="flex items-center space-x-2">
              <RadioGroup.Item value="BUY" id="BUY" />
              <Label for="BUY">買</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroup.Item value="SELL" id="SELL" />
              <Label for="SELL">賣</Label>
            </div>
          </RadioGroup.Root>
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="price">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>交易價格</Form.Label>
          <Input
            {...props}
            step="0.0000001"
            type="number"
            bind:value={$formData.price}
            placeholder="交易價格"
            class="w-full text-right"
          />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="amount">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>交易數量</Form.Label>
          <Input
            {...props}
            type="number"
            step="0.0000001"
            bind:value={$formData.amount}
            placeholder="交易數量"
            class="w-full text-right"
          />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="note">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>備注</Form.Label>
          <Input
            {...props}
            type="text"
            bind:value={$formData.note}
            placeholder="(選填)備註"
            class="w-full text-right"
          />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Button>確認</Form.Button>
  </form>
</section>
