<script lang="ts">
  import "../app.css";

  let { children } = $props();

</script>

<main
  class="flex items-center min-w-md justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
>
  {@render children()}
</main>
