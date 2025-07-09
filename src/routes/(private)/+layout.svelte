<script lang="ts">
  import { LogOut } from "@lucide/svelte";
  import Tabs from "@/dashboard/tabs.svelte";
  import "../../app.css";

  let { children } = $props();
</script>

<main class="flex justify-center mx-auto bg-gray-100 text-gray-800">
  <div class="container max-w-md h-screen relative bg-blue-400">
    <div class="flex justify-end px-4 pt-4">
      <a
        href="/logout"
        data-sveltekit-preload-data="off"
        class="text-white hover:text-gray-200"
      >
        <LogOut size="24" color="white" />
      </a>
    </div>
    <div class="h-full overflow-y-auto pt-2">
      {@render children()}
    </div>
    <div
      class="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-md w-full bg-white border-t border-gray-200 shadow-lg"
    >
      <Tabs />
    </div>
  </div>
</main>
