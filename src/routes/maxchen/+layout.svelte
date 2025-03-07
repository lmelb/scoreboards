<script lang="ts">
	import { getPlayersState } from '$lib/player-state';
	import { setMaxchenState } from './maxchen-state';

	const players = getPlayersState().players;
	setMaxchenState(players);
	let { children } = $props();
</script>

{@render children()}
