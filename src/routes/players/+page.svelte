<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import CloseableBadge from '$lib/components/closeable-badge/closeable-badge.svelte';
	import { Player, PlayerError } from '$lib/models/Player';
	import { getPlayersState } from '$lib/playerState';
	import { UserPlus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	let playersState = getPlayersState();

	let playerName = $state<string>('');
	let playerNameInput = $state<HTMLElement>();
	let error = $state<string | null>(null);

	function addPlayer() {
		try {
			const player = new Player(playerName.trim());
			playersState.addPlayer(player);
			toast.success(`Player ${player.name} has been added.`);
		} catch (e) {
			if (e instanceof PlayerError) error = e.message;
			else throw e;
		} finally {
			playerName = '';
			playerNameInput?.focus();
		}
	}
	function removePlayer(player: Player) {
		try {
			playersState.removePlayer(player);
			toast.success(`Player ${player.name} has been removede.`);
		} catch (e) {
			if (e instanceof PlayerError) toast.error(e.message);
			else throw e;
		}
	}
</script>

<Card>
	<CardHeader>
		<CardTitle>Add Players</CardTitle>
		<CardDescription>Add a new players to the Game</CardDescription>
	</CardHeader>
	<CardContent>
		<form
			onsubmit={(e) => {
				e.preventDefault();
				addPlayer();
			}}
		>
			<div class="grid gap-2">
				<div class="flex gap-2">
					{#each playersState.getPlayers() as player}
						<CloseableBadge close={() => removePlayer(player)}>
							{player.name}
						</CloseableBadge>
					{/each}
				</div>
				<div class="mt-2 flex items-end gap-2">
					<div>
						<Label for="name">Player name</Label>
						<Input
							type="text"
							placeholder="Name"
							id="name"
							class="w-full"
							autocomplete="off"
							onchange={() => (error = '')}
							bind:value={playerName}
							bind:ref={playerNameInput}
						/>
					</div>
					<Button variant="secondary" type="submit">
						<UserPlus class="mr-2 h-4 w-4" /> Add
					</Button>
				</div>
				{#if error}
					<p class="text-sm text-red-500">{error}</p>
				{/if}
			</div>
		</form>
	</CardContent>
</Card>
