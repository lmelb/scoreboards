<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { getPlayersService } from '$lib/services/player.service.svelte';

	import AddPlayerForm from './add-player-form.svelte';
	import PlayerList from './player-list.svelte';

	const players = getPlayersService().players;
</script>

<Card>
	<CardHeader>
		<CardTitle>Add Players</CardTitle>
		<CardDescription>Add a new players to the Game</CardDescription>
	</CardHeader>
	<CardContent>
		<div class="grid gap-8">
			<PlayerList />
			<AddPlayerForm />
		</div>
	</CardContent>
</Card>
{#if players.length > 0}
	<Button href="/maxchen">Play Mäxchen</Button>
{/if}
