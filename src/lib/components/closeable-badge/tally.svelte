<script lang="ts">
	import { cn } from '$lib/utils';
	import { Tally1, Tally2, Tally3, Tally4, Tally5 } from 'lucide-svelte';

	const { value, class: className }: { value: number; class: string } = $props();
</script>

{#if value === 1}
	<Tally1 class={className} aria-label="1" />
{:else if value === 2}
	<Tally2 class={className} aria-label="2" />
{:else if value === 3}
	<Tally3 class={className} aria-label="3" />
{:else if value === 4}
	<Tally4 class={cn('text-red-800', className)} aria-label="4" />
{:else if value === 5}
	<Tally5 class={cn('text-red-500', className)} aria-label="5" />
{/if}
