<script lang="ts">
	import { CloseableBadge } from '$lib/components/closeable-badge';
	import type { Player } from '$lib/models/Player';
	import { getPlayersService } from '$lib/services/player.service';

	const playerService getPlayersServicete();
</script>

<div class="flex flex-wrap gap-2">
	{#each playerService.players as player}
		<CloseableBadge close={() => playerService.remove(player)}>
			{player.name}
		</CloseableBadge>
	{/each}
</div>
