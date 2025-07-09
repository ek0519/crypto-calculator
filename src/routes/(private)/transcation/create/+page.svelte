<script lang="ts">
  import TranscationForm from "$lib/transcation/transcation-form.svelte";
  import type { PageData } from "./$types";
  let { data }: { data: PageData } = $props();
</script>

<div class="rounded-b-2xl px-4 mb-16">
  <TranscationForm title={"新增交易"} {data} />
</div>
