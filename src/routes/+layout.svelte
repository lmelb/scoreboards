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

	let { children } = $props();

	let mobileOpen = $state(false);

	const playerService = setPlayersService();
	setMaxchenService(playerService);
	setDoppelkopfService(playerService);
	setWizardService(playerService);
</script>

<ModeWatcher />
<Toaster />

<Sidebar.Provider bind:mobileOpen>
	<Sidebar.Root variant="inset" collapsible="icon">
		<Sidebar.Header>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton size="lg">
						{#snippet child({ props }: { props: Record<string, any> })}
							<a href={routes.root.url} {...props}>
								<div
									class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
								>
									<Dices class="size-4" />
								</div>
								<div class="grid flex-1 text-left text-sm leading-tight">
									<span class="truncate font-semibold">{routes.root.title}</span>
									<!-- <span class="truncate text-xs">Enterprise</span> -->
								</div>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Header>
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel>Setup</Sidebar.GroupLabel>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton isActive={page.url.pathname === routes.players.url}>
							{#snippet child({ props })}
								<a href={routes.players.url} {...props}>
									<Users />
									<span>{routes.players.title}</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.Group>

			<Sidebar.Group>
				<Sidebar.GroupLabel>Games</Sidebar.GroupLabel>
				<Sidebar.Menu>
					{#each Object.values(routes.games) as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton isActive={page.url.pathname === item.url}>
								{#snippet child({ props })}
									<a href={item.url} {...props} onclick={() => (mobileOpen = false)}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.Group>
		</Sidebar.Content>
		<Sidebar.Footer>
			<Sidebar.Group>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							{#snippet child({ props })}
								<button {...props} onclick={toggleMode}>
									{#if $mode === 'dark'}
										<Sun /> <span>Light Mode</span>
									{:else}
										<Moon /> <span>Dark Mode</span>
									{/if}
								</button>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.Group>
		</Sidebar.Footer>
	</Sidebar.Root>
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
		>
			<div class="flex w-full items-center px-4">
				<Sidebar.Trigger class="-ml-1" />
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
