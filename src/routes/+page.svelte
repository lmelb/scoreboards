<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { getPlayersService } from '$lib/services/player.service.svelte';
	import { routes } from './routes';

	const players = getPlayersService().players;
</script>

<Card>
	<CardHeader>
		<CardTitle>Welcome to SimpleScore!</CardTitle>
	</CardHeader>
	<CardContent>
		{#if players.isEmpty()}
			<p class="mb-4">Start by adding Players to your game</p>
			<Button href={routes.players.url}>Add Players</Button>
		{:else}
			<p class="mb-4">Welcome back time for another round?</p>
			<div class="flex gap-4">
				<Button href={routes.games.maxchen.url}>Play Maxchen</Button>
				<Button variant="secondary" href={routes.players.url}>Manage Players</Button>
			</div>
		{/if}
	</CardContent>
</Card>
