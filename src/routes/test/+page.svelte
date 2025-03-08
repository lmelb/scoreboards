<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { PersistedState, StateHistory } from 'runed';

	let players = new PersistedState<string[]>('test2', ['anne', 'lars']);
	let rounds = new PersistedState<number[][]>('test', [[0, 0]]);

	const history = new StateHistory(
		() => {
			console.log($state.snapshot(rounds.current)[0]);
			return $state.snapshot(rounds.current);
		},
		(c) => {
			rounds.current = c;
			console.log($state.snapshot(c)[0]);
		}
	);

	function score(playerName: string) {
		const index = players.current.indexOf(playerName);
		rounds.current[rounds.current.length - 1][index]++;
		rounds.current = [...rounds.current];
	}

	// $inspect(history.log.map((it) => it.snapshot));
</script>

<div class="flex gap-2">
	<Button onclick={() => score('anne')}>anne</Button>
	<Button onclick={() => score('lars')}>lars</Button>

	<Button disabled={!history.canUndo} onclick={history.undo}>Undo</Button>
	<Button disabled={!history.canRedo} onclick={history.redo}>Redo</Button>
</div>

{#each players.current as player, i}
	{player}:{#each rounds.current as round}
		{round[i]};
	{/each}
{/each}
