<script lang="ts">
  import { page } from "$app/state";
  import { cn } from "@/utils";
  import { ArrowLeftRight, LayoutDashboard } from "@lucide/svelte";

  const isActive = (path: string) => {
    return page.url.pathname === path
      ? cn("bg-blue-400", "text-gray-100")
      : cn("bg-blue-200", "text-white");
  };
</script>

<div class="grid grid-cols-2">
  <div>
    <a
      class="text-center items-center {isActive(
        '/dashboard',
      )} py-2 rounded-tl-2xl flex gap-2 justify-center hover:font-bold"
      href="/dashboard"
    >
      <LayoutDashboard />
      <span>Dashboard</span>
    </a>
  </div>
  <div>
    <a
      class="text-center items-center flex {isActive(
        '/transcation',
      )} py-2 rounded-tr-2xl gap-2 justify-center hover:font-bold"
      href="/transcation"
    >
      <ArrowLeftRight />
      <span>Transcation</span>
    </a>
  </div>
</div>
