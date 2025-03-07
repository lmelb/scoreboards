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
	import { getPlayersService } from '$lib/services/player.service';
	import { Play, Plus, RotateCw } from 'lucide-svelte';
	import { getMaxchenService } from '../../lib/services/maxchen.service';

	const players = getPlayersService().players;
	const maxchenService = getMaxchenService();
</script>

{#if maxchenService.rounds.length === 0}
	<Button onclick={() => maxchenService.newRound()}><Play /> Start Game</Button>
{:else}
	<div class="flex justify-end gap-2">
		<Button variant="outline" onclick={() => maxchenService.reset()}><RotateCw /></Button>
		<Button onclick={() => maxchenService.newRound()}><Plus /> New Round</Button>
	</div>
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead class="w-[20px]">#</TableHead>
				{#each maxchenService.playerNames as playerName}
					<TableHead>{playerName}</TableHead>
				{/each}
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each maxchenService.rounds as round}
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
						<Button variant="outline" onclick={() => maxchenService.looseRound(player.name)}>
							{player.name}
						</Button>
					</TableCell>
				{/each}
			</TableRow>
		</TableFooter>
	</Table>
{/if}
