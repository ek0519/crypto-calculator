<script lang="ts">
  import { page } from "$app/state";
  import { cn } from "@/utils";
  import { ArrowLeftRight, LayoutDashboard } from "@lucide/svelte";

  const isActive = (path: string) => {
    return page.url.pathname === path;
  };
</script>

<div class="grid grid-cols-2 bg-white">
  <div>
    <a
      class="flex flex-col items-center justify-center py-3 px-4 transition-colors duration-200 {isActive(
        '/dashboard',
      )
        ? 'text-blue-600 bg-blue-50'
        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}"
      href="/dashboard"
    >
      <LayoutDashboard size={24} />
      <span class="text-xs mt-1 font-medium">Dashboard</span>
    </a>
  </div>
  <div>
    <a
      class="flex flex-col items-center justify-center py-3 px-4 transition-colors duration-200 {isActive(
        '/transcation',
      )
        ? 'text-blue-600 bg-blue-50'
        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}"
      href="/transcation"
    >
      <ArrowLeftRight size={24} />
      <span class="text-xs mt-1 font-medium">Transaction</span>
    </a>
  </div>
</div>
