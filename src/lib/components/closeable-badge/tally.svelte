<script lang="ts">
	import { Tally1, Tally2, Tally3, Tally4, Tally5 } from 'lucide-svelte';

	const { value } = $props();
</script>

{#if value === 1}
	<Tally1 aria-label="1" />
{:else if value === 2}
	<Tally2 aria-label="2" />
{:else if value === 3}
	<Tally3 aria-label="3" />
{:else if value === 4}
	<Tally4 class="text-red-800" aria-label="4" />
{:else if value === 5}
	<Tally5 class="text-red-500" aria-label="5" />
{/if}
