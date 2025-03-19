<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { getDoppelkopfService } from '$lib/services/doppelkopf.service.svelte';
	import { Pi, User } from 'lucide-svelte';

	const service = getDoppelkopfService();
</script>

<Table.Root>
	<Table.Header>
		<Table.Row class="hover:bg-inherit">
			<Table.Head class="p-0 text-center">#</Table.Head>
			{#each service.playerNames as playerName}
				<Table.Head class="px-1 pb-2 text-center">
					{playerName}
				</Table.Head>
			{/each}
			<Table.Head class="px-1 pb-2 text-center">
				<Pi class="inline size-4" aria-label="Score per round" />
			</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each [...service.rounds].reverse() as round, i}
			<Table.Row class="hover:bg-inherit">
				<Table.Cell class="px-0 text-center">{service.rounds.length - i}</Table.Cell>
				{#each round.playerScores as player}
					<Table.Cell class="px-0 py-2 text-center">
						{player.score}
					</Table.Cell>
				{/each}
				<Table.Cell class="px-0 py-2 text-center">
					{round.score}
					{#if round.isSolo}<User class="inline size-3 align-super" aria-label="Solo" />{/if}
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
