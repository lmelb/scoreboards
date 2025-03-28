<script lang="ts">
	import * as Form from '$lib/components/ui/form';
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
		const result = await validateForm({ update: true });
		if (result.valid) {
			onsubmit(result.data);
		}
	}
</script>

{@render children?.()}

<form method="POST" use:enhance onsubmit={handleSubmit} class="mt-4 grid gap-3">
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
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		{/each}
	</div>
	<div class="text-sm font-medium text-destructive">
		{$errors._errors}
	</div>

	<Form.Button class="justify-self-start">Submit expected trics</Form.Button>
</form>
