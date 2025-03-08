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
	import { Play, Redo, RotateCw, Undo } from 'lucide-svelte';
	import { getMaxchenService } from '../../lib/services/maxchen.service.svelte';

	const maxchenService = getMaxchenService();
</script>

{#if maxchenService.rounds.length === 0}
	<Button onclick={() => maxchenService.newRound()}><Play /> Start Game</Button>
{:else}
	<div class="flex justify-end gap-2">
		<Button
			variant="outline"
			disabled={!maxchenService.history.canUndo}
			onclick={maxchenService.history.undo}><Undo /></Button
		>
		<Button variant="outline" onclick={() => maxchenService.reset()}><RotateCw /></Button>
		<Button
			variant="outline"
			disabled={!maxchenService.history.canRedo}
			onclick={maxchenService.history.redo}><Redo /></Button
		>
	</div>
	<Table>
		<TableHeader>
			<TableRow>
				{#each maxchenService.playerNames as playerName}
					<TableHead>{playerName}</TableHead>
				{/each}
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each maxchenService.rounds as round}
				<TableRow>
					{#each round.scores as [playerName, score]}
						<TableCell>
							<Tally value={score} />
						</TableCell>
					{/each}
				</TableRow>
			{/each}
		</TableBody>
	</Table>
	<div class="flex gap-2">
		{#each maxchenService.playerNames as playerName}
			<Button variant="outline" onclick={() => maxchenService.looseRound(playerName)}>
				{playerName}
			</Button>
		{/each}
	</div>
{/if}
