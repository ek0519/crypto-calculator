<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import Button from "@/components/ui/button/button.svelte";
  import type { PageProps } from "./$types";

  let { form }: PageProps = $props();
  let email = $state("");
  const isSuccess = $derived.by(() => {
    const successParam = page.url.searchParams.get("success");
    return successParam === "true";
  });
  const emailIsValid = $derived.by(() => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  });
</script>

<Card.Root class="w-full max-w-md mx-2">
  <Card.Header>
    <Card.Title>login</Card.Title>
    <Card.Description>You will receive a magic link</Card.Description>
  </Card.Header>
  <form action="/login" method="post" use:enhance>
    <Card.Content>
      <Input
        disabled={isSuccess}
        type="email"
        name="email"
        bind:value={email}
        placeholder="please enter your email"
      />
      {#if isSuccess}
        <p class="text-green-600">Check your email for the magic link!</p>
      {/if}
      {#if form?.error}
        <p class="text-rose-400">{form?.error}</p>
      {/if}
    </Card.Content>
    <Card.Footer class="flex justify-end text-sm pt-4">
      <Button type="submit" disabled={!emailIsValid || isSuccess}
        >click me</Button
      >
    </Card.Footer>
  </form>
</Card.Root>
