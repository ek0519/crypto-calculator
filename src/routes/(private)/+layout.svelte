<script lang="ts">
    import Tabs from "@/dashboard/tabs.svelte";
  import "../../app.css";

  let { children } = $props();

</script>

<main
  class="flex pt-2 justify-center mx-auto min-h-screen bg-gray-100  text-gray-800 "
>
  <div class="container">
    <Tabs />
    {@render children()}
  </div>
</main>
