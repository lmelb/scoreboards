<script lang="ts">
	import { CloseableBadge } from '$lib/components/closeable-badge';
	import type { Player } from '$lib/models/Player';
	import { getPlayersState } from '$lib/playerState';

	const playerState = getPlayersState();
</script>

<div class="flex flex-wrap gap-2">
	{#each playerState.players as player}
		<CloseableBadge close={() => playerState.remove(player)}>
			{player.name}
		</CloseableBadge>
	{/each}
</div>
