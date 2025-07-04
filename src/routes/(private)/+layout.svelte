<script lang="ts">
  import Tabs from "@/dashboard/tabs.svelte";
  import "../../app.css";

  let { children } = $props();
</script>

<main class="flex justify-center mx-auto h-screen bg-gray-100 text-gray-800">
  <div class="container max-w-md h-full relative">
    <div class="h-full overflow-y-auto pb-20">
      {@render children()}
    </div>
    <div
      class="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-md w-full bg-white border-t border-gray-200 shadow-lg"
    >
      <Tabs />
    </div>
  </div>
</main>
