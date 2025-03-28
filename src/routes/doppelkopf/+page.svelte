<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { getDoppelkopfService } from '$lib/services/doppelkopf.service.svelte';
	import { routes } from '../routes';
	import AddScoreForm from './add-score-form.svelte';
	import ScoreBoard from './score-board.svelte';
	import Toolbar from './toolbar.svelte';

	const service = getDoppelkopfService();
</script>

{#if service.playerNames.length >= 4}
	<Toolbar />
{/if}
<Card.Root>
	<Card.Header>
		<Card.Title>Doppelkopf</Card.Title>
		<Card.Description>Some Doppelkpf info and rule link</Card.Description>
	</Card.Header>
	<Card.Content class="mt-4  p-2">
		{#if !service.hasPlayers}
			<Button href={routes.players.url}>Add Players</Button>
		{:else if service.playerNames.length < 4}
			<p>
				Doppelkopf can only be Played with at least 4 players (cureently you have {service
					.playerNames.length} PLayers).
			</p>
			<Button href={routes.players.url}>Manage Players</Button>
		{:else}
			<AddScoreForm />
			<ScoreBoard />
		{/if}
	</Card.Content>
</Card.Root>
