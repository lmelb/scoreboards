<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { GripVertical, Trash } from 'lucide-svelte';
	import {
		SortableItem,
		SortableList,
		type SortableItemData,
		sortItems,
		Handle,
		type SortEventDetail
	} from '@rodrigodagostino/svelte-sortable-list';
	import type { Player } from '$lib/models/Player';
	import { getPlayersService } from '$lib/services/player.service.svelte';

	const playerService = getPlayersService();

	type SpryablePlayer = {
		id: string;
		player: Player;
	};
	let items: SpryablePlayer[] = $derived(
		playerService.players.map((it) => ({ id: it.name, player: it }))
	);

	function handleSort(event: CustomEvent<SortEventDetail>) {
		const { prevItemIndex, nextItemIndex } = event.detail;
		sortItems(items, prevItemIndex, nextItemIndex);
		playerService.sort(prevItemIndex, nextItemIndex);
	}
</script>

<SortableList on:sort={handleSort}>
	{#each items as item, index}
		<SortableItem {...item} {index}>
			<div class="flex items-center justify-stretch gap-1">
				<Handle>
					<GripVertical class="size-5 text-primary/20" />
				</Handle>
				<div class="w-full rounded-md bg-muted px-3 py-2">
					{item.player.name}
				</div>
				<Button
					variant="ghost"
					class="hover:bg-destructive/10 dark:hover:bg-destructive/30"
					size="icon"
					onclick={() => playerService.remove(item.player)}
				>
					<Trash class="h-4 w-4 text-destructive" />
				</Button>
			</div>
		</SortableItem>
	{/each}
</SortableList>

{#each playerService.players as player}{/each}
