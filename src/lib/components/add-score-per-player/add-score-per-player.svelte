<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod, type ZodValidation } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input';
	import { ZodSchema, ZodType, z } from 'zod';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import type { AddScorePerPlayerProps } from '.';

	let { schema, playerNames, onsubmit, children }: AddScorePerPlayerProps = $props();

	const schemaWithDefaults = schema.default({
		scores: playerNames.map((name) => ({
			playerName: name,
			score: null as unknown as number
		}))
	});

	const form = superForm(defaults(zod(schemaWithDefaults)), {
		id: crypto.randomUUID(),
		SPA: true,
		validators: zod(schemaWithDefaults),
		resetForm: true,
		dataType: 'json'
	});

	const { form: formData, constraints, enhance, validateForm, errors } = form;

	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (disableValidation) {
			const submissionData = {
				...$formData,
				scores: $formData.scores.map((player) => ({
					...player,
					score: player.score ?? 0
				}))
			};
			return onsubmit(submissionData);
		}

		const result = await validateForm({ update: true });
		if (result.valid) {
			onsubmit(result.data);
		}
	}

	let disableValidation = $state(false);
</script>

{@render children?.()}

<form method="POST" use:enhance onsubmit={handleSubmit} class="mt-4 grid gap-x-3 gap-y-2">
	<div class="flex gap-6">
		{#each $formData.scores as player, i}
			<Form.Field {form} name="scores[{i}].score">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>{player.playerName}</Form.Label>
						<Input
							{...props}
							type="number"
							bind:value={player.score}
							min={Number($constraints.scores?.score?.min)}
							max={Number($constraints.scores?.score?.max)}
						/>
					{/snippet}
				</Form.Control>
				{#if !disableValidation}
					<Form.FieldErrors />
				{:else}
					<!-- For spacing -->
					<div></div>
				{/if}
			</Form.Field>
		{/each}
	</div>

	{#if !disableValidation && $errors._errors && $errors._errors.length > 0}
		<div class="text-sm font-medium text-destructive">
			{$errors._errors}
		</div>
	{/if}

	<div class="items-top mb-2 flex space-x-2 rounded-md border p-4 leading-none">
		<Checkbox bind:checked={disableValidation} id="disableValidation" />
		<div class="grid gap-1.5 leading-none">
			<Label
				for="disableValidation"
				class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Disabel all trick count checks
			</Label>
			<span class="text-sm text-muted-foreground">
				Disable this if a special card was played which changed the possible trick count
			</span>
		</div>
	</div>

	<Form.Button class="justify-self-start">Submit expected trics</Form.Button>
</form>
