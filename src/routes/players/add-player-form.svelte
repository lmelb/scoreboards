<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import { Player } from '$lib/models/player';
	import { UserPlus } from 'lucide-svelte';
	import { validatePlayerName } from './player-name-validation';
	import { getPlayersService } from '$lib/services/player.service.svelte';

	const playerService = getPlayersService();

	let playerNameInput = $state<HTMLInputElement>()!;

	type Validation = { valid: boolean; playerName?: string; errors: string[] };
	let validation: Validation = $state({ valid: false, errors: [] });

	function onchange() {
		const validatedPlayer = validatePlayerName(playerNameInput.value, playerService);
		validation = {
			valid: validatedPlayer.success,
			playerName: validatedPlayer.data,
			errors: validatedPlayer.error?.issues.map((error) => error.message) ?? []
		};
	}

	function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!validation.valid) return;

		const player = new Player(validation.playerName!);
		playerService.add(player);

		playerNameInput.value = '';
		playerNameInput.focus();
	}
</script>

<form {onsubmit}>
	<div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="name">Player name</Label>
		<div class="flex gap-2">
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
			<Button variant="secondary" type="submit">
				<UserPlus class="mr-2 h-4 w-4" /> Add
			</Button>
		</div>
		{#if !validation.valid}
			<div class="text-sm font-medium text-destructive">{validation.errors.join(', and ')}</div>
		{/if}
	</div>
</form>
