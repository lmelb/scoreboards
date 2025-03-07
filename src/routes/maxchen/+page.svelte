<script lang="ts">
	import Tally from '$lib/components/closeable-badge/tally.svelte';
	import { Button } from '$lib/components/ui/button';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import TableFooter from '$lib/components/ui/table/table-footer.svelte';
	import { getPlayersState } from '$lib/player-state';
	import { Play, Plus, RotateCw } from 'lucide-svelte';
	import { getMaxchenState } from './maxchen-state';

	const players = getPlayersState().players;
	const maxchenState = getMaxchenState();
</script>

{#if maxchenState.rounds.length === 0}
	<Button onclick={() => maxchenState.newRound()}><Play /> Start Game</Button>
{:else}
	<div class="flex justify-end gap-2">
		<Button variant="outline" onclick={() => maxchenState.reset()}><RotateCw /></Button>
		<Button onclick={() => maxchenState.newRound()}><Plus /> New round</Button>
	</div>
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead class="w-[20px]">#</TableHead>
				{#each maxchenState.playerNames as playerName}
					<TableHead>{playerName}</TableHead>
				{/each}
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each maxchenState.rounds as round}
				<TableRow>
					<TableCell>{round.index}</TableCell>
					{#each round.scores as score}
						<TableCell>
							<Tally value={score.value} />
						</TableCell>
					{/each}
				</TableRow>
			{/each}
		</TableBody>
		<TableFooter>
			<TableRow>
				<TableCell></TableCell>
				{#each players as player}
					<TableCell>
						<Button variant="outline" onclick={() => maxchenState.looseRound(player.name)}>
							{player.name}
						</Button>
					</TableCell>
				{/each}
			</TableRow>
		</TableFooter>
	</Table>
{/if}
