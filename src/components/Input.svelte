<script lang="ts">
  let {
    type,
    id,
    className,
    value = $bindable(),
    placeholder = "",
  } = $props<{
    type: "text" | "number" | "email" | "password";
    id?: string;
    className: string;
    class?: string;
    value: number;
    placeholder?: string;
  }>();
</script>

<input
  class={`rounded bg-gray-600 text-gray-200 p-2 ${className}`}
  oninput={(e) => (value = (e.target as HTMLInputElement).value)}
  {placeholder}
  {type}
  {id}
  bind:value
/>
