<script lang="ts">
	import Tally from '$lib/components/closeable-badge/tally.svelte';
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { RotateCw, Undo } from 'lucide-svelte';
	import { getMaxchenService } from '../../lib/services/maxchen.service.svelte';

	const maxchenService = getMaxchenService();
</script>

{#if !maxchenService.hasPlayers}
	<Button href="/players">Add Players</Button>
{:else}
	<div class="flex justify-end">
		<Button
			size="icon"
			variant="ghost"
			disabled={!maxchenService.history.canUndo}
			onclick={maxchenService.history.undo}><Undo /></Button
		>
		<Button size="icon" variant="ghost" onclick={() => maxchenService.reset()}><RotateCw /></Button>
	</div>

	<Card>
		<CardHeader>
			<CardTitle>Mäxchen</CardTitle>
			<CardDescription>Click on the player names to edit the score</CardDescription>
		</CardHeader>
		<CardContent class="mt-4  p-2">
			<Table>
				<TableHeader>
					<TableRow class="hover:bg-inherit">
						<TableHead class="p-0 text-center">#</TableHead>
						{#each maxchenService.playerNames as playerName}
							<TableHead class="px-1 pb-2 text-center">
								<Button variant="secondary" onclick={() => maxchenService.looseRound(playerName)}>
									{playerName}
								</Button>
							</TableHead>
						{/each}
					</TableRow>
				</TableHeader>
				<TableBody>
					{#each [...maxchenService.rounds].reverse() as round, i}
						<TableRow class="hover:bg-inherit">
							<TableCell class="px-0 text-center">{maxchenService.rounds.length - i}</TableCell>
							{#each round.scores as [playerName, score]}
								<TableCell class="px-0 py-2">
									<Tally value={score} class="w-full" />
								</TableCell>
							{/each}
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
{/if}
