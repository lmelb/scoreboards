<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import { Player } from '$lib/models/Player';
	import { getPlayersState } from '$lib/playerState';
	import { UserPlus } from 'lucide-svelte';
	import { validatePlayerName } from './player-name-validation';

	const playerState = getPlayersState();

	let playerNameInput = $state<HTMLInputElement>()!;

	let validation: { valid: boolean; errors: string[] } = $state<{
		valid: boolean;
		errors: string[];
	}>({
		valid: false,
		errors: []
	});

	function onchange() {
		const validatedPlayer = validatePlayerName(playerNameInput.value, playerState);
		validation = {
			valid: validatedPlayer.success,
			errors: validatedPlayer.error?.issues.map((error) => error.message) ?? []
		};
	}

	function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!validation.valid) return;

		const player = new Player(playerNameInput.value);
		playerState.add(player);

		playerNameInput.value = '';
		playerNameInput.focus();
	}
</script>

<form {onsubmit}>
	<div class="flex items-end gap-2 pb-2">
		<div>
			<Label for="name">Player name</Label>
			<Input
				id="name"
				name="name"
				type="text"
				placeholder="Name"
				autocomplete="off"
				class="w-full"
				bind:ref={playerNameInput}
				{onchange}
			/>
		</div>
		<Button variant="secondary" type="submit">
			<UserPlus class="mr-2 h-4 w-4" /> Add
		</Button>
	</div>

	{#if !validation.valid}
		<div class="text-sm font-medium text-destructive">{validation.errors.join(', and ')}</div>
	{/if}
</form>
