<script lang="ts">
  import Create from "$lib/transcation/create.svelte";
  import type { PageData } from "./$types";
  let { data }: { data: PageData } = $props();
</script>

<div class="rounded-b-2xl px-4 mb-16">
  <Create title={"編輯交易"} {data} />
</div>
