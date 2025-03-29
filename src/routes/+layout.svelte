<script lang="ts">
	import { mode, ModeWatcher, toggleMode } from 'mode-watcher';

	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { Toaster } from '$lib/components/ui/sonner';
	import { setDoppelkopfService } from '$lib/services/doppelkopf.service.svelte';
	import { setMaxchenService } from '$lib/services/maxchen.service.svelte';
	import { setPlayersService } from '$lib/services/player.service.svelte';
	import { setWizardService } from '$lib/services/wizard.service.svelte';
	import { Dices, Moon, Sun, Users } from 'lucide-svelte';
	import '../app.css';
	import { routes } from './routes';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import { goto } from '$app/navigation';
	import * as Tooltip from '$lib/components/ui/tooltip';

	let { children } = $props();

	const playerService = setPlayersService();
	setMaxchenService(playerService);
	setDoppelkopfService(playerService);
	setWizardService(playerService);

	let activeRoute = $derived(
		Object.values(routes.games).find((it) => it.url === page.url.pathname)
	);
</script>

<ModeWatcher />
<Toaster />

<div class="sticky top-0 z-10 flex h-16 items-center border bg-background">
	<nav class="container flex max-w-4xl items-center gap-4 py-4">
		<a href={routes.root.url} class="flex items-center gap-2">
			<routes.root.icon class="size-10 rounded-sm bg-foreground p-2 text-background" />
			<span class="hidden sm:inline">{routes.root.title}</span>
		</a>
		<div class="ms-auto"></div>
		<Select.Root type="single" value={page.url.pathname}>
			<Select.Trigger class="flex w-[18ch] gap-2">
				{#if activeRoute}
					<activeRoute.icon /> {activeRoute.title}
				{:else}
					Select Game
				{/if}
			</Select.Trigger>
			<Select.Content>
				{#each Object.values(routes.games) as item (item.title)}
					<Select.Item value={item.url} onclick={() => goto(item.url)}>
						<item.icon />
						{item.title}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Button size="icon" variant="ghost" href={routes.players.url}>
						<Users />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Manage players</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</nav>
</div>

<main class="container my-4 grid max-w-4xl gap-4">
	{#if children}
		{@render children()}
	{/if}
</main>

<footer class="mt-auto flex justify-center">
	<Button variant="link" class="text-muted-foreground" href={routes.privacy.url}
		>{routes.privacy.title}</Button
	>
</footer>
