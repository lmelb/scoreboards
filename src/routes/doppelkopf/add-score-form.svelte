<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Slider } from '$lib/components/ui/slider';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle-group';
	import { getDoppelkopfService } from '$lib/services/doppelkopf.service.svelte';
	import { User } from 'lucide-svelte';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { formSchema } from './schema';

	const service = getDoppelkopfService();

	const form = superForm(defaults(zod(formSchema)), {
		SPA: true,
		validators: zod(formSchema),
		resetForm: true
	});

	const { form: formData, constraints, enhance, validateForm } = form;

	async function handleSubmit(event: Event) {
		event.preventDefault();
		const result = await validateForm({ update: true });

		if (result.valid) {
			const { winners, losers, score } = result.data;
			service.score(winners, losers, score);
		}
	}

	function isDisabled(playerName: string, group: 'winners' | 'losers'): boolean {
		const { winners, losers, isSolo: solo } = $formData;

		switch (group) {
			case 'winners':
				return (
					losers.includes(playerName) ||
					(!winners.includes(playerName) && winners.length >= (solo ? 1 : 2))
				);
			case 'losers':
				return (
					winners.includes(playerName) ||
					(!losers.includes(playerName) && losers.length >= (solo ? 3 : 2))
				);
		}
	}
</script>

<form method="POST" use:enhance onsubmit={handleSubmit} class="mt-3 grid gap-3">
	<Form.Field {form} name="isSolo">
		<Form.Control>
			{#snippet children({ props })}
				<div class="flex items-center gap-2">
					<Switch {...props} bind:checked={$formData.isSolo} />
					<Form.Label>is Solo [<User class="inline size-3.5" aria-label="solo icon" />]</Form.Label>
				</div>
			{/snippet}
		</Form.Control>
	</Form.Field>

	<Form.Field {form} name="winners">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Winners</Form.Label>
				<ToggleGroup
					{...props}
					class="justify-start"
					variant="outline"
					bind:value={$formData.winners}
					type="multiple"
				>
					{#each service.playerNames as playerName}
						<ToggleGroupItem
							class="h-auto px-2 py-1"
							value={playerName}
							disabled={isDisabled(playerName, 'winners')}
							aria-label="Select winners"
						>
							{playerName}
						</ToggleGroupItem>
					{/each}
				</ToggleGroup>
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="losers">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Losers</Form.Label>
				<ToggleGroup
					{...props}
					class="justify-start"
					variant="outline"
					bind:value={$formData.losers}
					type="multiple"
				>
					{#each service.playerNames as playerName}
						<ToggleGroupItem
							class="h-auto px-2 py-1"
							value={playerName}
							disabled={isDisabled(playerName, 'losers')}
							aria-label="Select losers"
						>
							{playerName}
						</ToggleGroupItem>
					{/each}
				</ToggleGroup>
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="score">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Score</Form.Label>
				<div class="flex gap-3 pl-3">
					<Slider
						type="single"
						{...props}
						bind:value={$formData.score}
						min={Number($constraints.score?.min)}
						max={Number($constraints.score?.max)}
					/>
					<span class="w-[3ch]">{$formData.score}</span>
				</div>
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Score</Form.Button>
</form>
