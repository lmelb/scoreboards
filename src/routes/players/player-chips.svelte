<script lang="ts">
	import { CloseableBadge } from '$lib/components/closeable-badge';
	import { getPlayersService } from '$lib/services/player.service.svelte';

	const playerService = getPlayersService();
</script>

<div class="flex flex-wrap gap-2">
	{#each playerService.players as player}
		<CloseableBadge close={() => playerService.remove(player)}>
			{player.name}
		</CloseableBadge>
	{/each}
</div>
