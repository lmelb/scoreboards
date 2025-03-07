<script lang="ts">
	import { getPlayersService } from '$lib/services/player.service';
	import { setMaxchenService } from '../../lib/services/maxchen.service';

	const players = getPlayersService().players;
	setMaxchenService(players);
	let { children } = $props();
</script>

{@render children()}
