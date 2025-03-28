<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { getWizardService } from '$lib/services/wizard.service.svelte';
	import { Pi, User } from 'lucide-svelte';

	const service = getWizardService();
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
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each [...service.rounds].reverse() as round, i}
			<Table.Row class="hover:bg-inherit">
				<Table.Cell class="px-0 text-center">{service.rounds.length - i}</Table.Cell>
				{#each round as player}
					<Table.Cell class="px-0 py-2 text-left">
						<strong>{player.score ?? ' - '}</strong>
						<span class="text-muted-foreground">
							({player.expectedTricks}|{player.actualTricks ?? ' - '})
						</span>
					</Table.Cell>
				{/each}
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
