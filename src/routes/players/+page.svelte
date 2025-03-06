<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

	import AddPlayer from './add-player.svelte';
	import PlayerChips from './player-chips.svelte';
</script>

<Card>
	<CardHeader>
		<CardTitle>Add Players</CardTitle>
		<CardDescription>Add a new players to the Game</CardDescription>
	</CardHeader>
	<CardContent>
		<div class="grid gap-2">
			<PlayerChips />
			<AddPlayer />
		</div>
	</CardContent>
</Card>
