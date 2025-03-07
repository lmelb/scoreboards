<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { getPlayersState } from '$lib/player-state';

	const players = getPlayersState().players;
</script>

<Card>
	<CardHeader>
		<CardTitle>Welcome to GameScore!</CardTitle>
	</CardHeader>
	<CardContent>
		{#if players.length === 0}
			<p class="mb-4">Start by adding Players to your game</p>
			<Button href="/players">Add Players</Button>
		{:else}
			<p class="mb-4">Welcome back time for another round?</p>
			<div class="flex gap-4">
				<Button href="##">Select Game</Button>
				<Button variant="secondary" href="/players">Manage Players</Button>
			</div>
		{/if}
	</CardContent>
</Card>
