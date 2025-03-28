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
	import { routes } from '../routes';

	import AddPlayerForm from './add-player-form.svelte';
	import PlayerList from './player-list.svelte';

	const numberOfPlayers = $derived(getPlayersService().players.length);
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
<Card>
	<CardHeader>
		<CardTitle>Select Game</CardTitle>
		<CardDescription
			>The following games can be played with {numberOfPlayers} players.</CardDescription
		>
	</CardHeader>
	<CardContent>
		<div class="grid gap-8">
			{#if numberOfPlayers <= 1}
				You need to add players before you can start a game.
			{/if}
			{#if numberOfPlayers > 1}
				<Button href={routes.games.maxchen.url}>Play {routes.games.maxchen.title}</Button>
			{/if}
			{#if numberOfPlayers > 2}
				<Button href={routes.games.wizard.url}>Play {routes.games.wizard.title}</Button>
			{/if}
			{#if numberOfPlayers == 4}
				<Button href={routes.games.doppelkopf.url}>Play {routes.games.doppelkopf.title}</Button>
			{/if}
		</div>
	</CardContent>
</Card>
