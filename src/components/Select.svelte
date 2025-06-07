<script lang="ts">
  import type { Option } from "$type";
  let {
    className,
    options,
    selected = $bindable(),
    id,
    disabled = false,
  } = $props<{
    className?: string;
    options: Option[];
    selected: string;
    id?: string;
    disabled?: boolean;
  }>();
</script>

<select
  {disabled}
  onchange={(e) => (selected = (e.target as HTMLSelectElement).value)}
  class={className}
  {id}
  bind:value={selected}
>
  {#each options as option}
    <option value={option.value}>{option.label}</option>
  {/each}
</select>
