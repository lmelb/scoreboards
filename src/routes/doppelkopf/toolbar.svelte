<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { getDoppelkopfService } from '$lib/services/doppelkopf.service.svelte';
	import { RotateCw, Settings, Undo } from 'lucide-svelte';

	const service = getDoppelkopfService();
</script>

<div class="flex justify-end">
	<Button
		size="icon"
		variant="ghost"
		disabled={!service.history.canUndo}
		onclick={service.history.undo}><Undo /></Button
	>
	<Button size="icon" variant="ghost" onclick={() => service.reset()}><RotateCw /></Button>

	<Popover.Root>
		<Popover.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
			<Settings />
		</Popover.Trigger>
		<Popover.Content align="end" class="w-fit">
			<div class="flex items-center gap-2">
				<Checkbox id="withNegativePoints" bind:checked={service.withNegativePoints.current} />
				<Label
					for="withNegativePoints"
					class="ext-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Negative points for losers
				</Label>
			</div>
		</Popover.Content>
	</Popover.Root>
</div>
