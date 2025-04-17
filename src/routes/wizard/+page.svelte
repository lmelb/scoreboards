<script lang="ts">
	import type { Scores } from '$lib/components/add-score-per-player';
	import AddScorePerPlayer from '$lib/components/add-score-per-player/add-score-per-player.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

	import { getWizardService } from '$lib/services/wizard.service.svelte';
	import { routes } from '../routes';
	import { getWizardSchema, sumOfScores } from './schema';
	import ScoreBoard from './score-board.svelte';
	import Toolbar from './toolbar.svelte';

	const service = getWizardService();
	const playerNames = service.playerNames;

	const expectSchema = $derived(
		getWizardSchema(service.possibleTricksNextRound).refine(
			(data) => sumOfScores(data.scores) !== service.possibleTricksNextRound,
			{ message: `The total number of tricks must not be ${service.possibleTricksNextRound}.` }
		)
	);

	const actualSchema = $derived(
		getWizardSchema(service.possibleTricks).refine(
			(data) => sumOfScores(data.scores) === service.possibleTricks,
			{ message: `The total number of tricks must be ${service.possibleTricks}.` }
		)
	);
</script>

<Toolbar />
<Card.Root>
	<Card.Header>
		<Card.Title>Wizard</Card.Title>
		<Card.Description></Card.Description>
		{#if !service.hasEstimation}
			<AddScorePerPlayer
				schema={expectSchema}
				{playerNames}
				onsubmit={(data) =>
					service.expect(
						data.scores.map((it) => ({
							playerName: it.playerName,
							expectedTricks: it.score
						}))
					)}
			>
				<h2 class="text-lg text-card-foreground">Expected tricks</h2>
				<p>Enter the expected tricks of each player.</p>
			</AddScorePerPlayer>
		{:else}
			<AddScorePerPlayer
				schema={actualSchema}
				{playerNames}
				onsubmit={(data) =>
					service.actual(
						data.scores.map((it) => ({
							playerName: it.playerName,
							actualTricks: it.score
						}))
					)}
			>
				<h2 class="text-lg text-card-foreground">Actual tricks</h2>
				<p>Enter the expected tricks of each player.</p>
			</AddScorePerPlayer>
		{/if}
	</Card.Header>
	<Card.Content class="mt-4  p-2">
		{#if !service.hasPlayers}
			<Button href={routes.players.url}>Add Players</Button>
		{:else if service.playerNames.length < 2}
			<p>
				Wizard can only be Played with at least 2 players (cureently you have {service.playerNames
					.length} PLayers).
			</p>
			<Button href={routes.players.url}>Manage Players</Button>
		{/if}
		{#if service.rounds.length > 0}
			<ScoreBoard />
		{/if}
	</Card.Content>
</Card.Root>
