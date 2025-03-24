<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	import '../app.css';
	import { Dices, Users } from 'lucide-svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { activeNav } from '$lib/actions/active-nav.svelte';
	import { setPlayersService } from '$lib/services/player.service.svelte';
	import { setMaxchenService } from '$lib/services/maxchen.service.svelte';
	import { routes } from './routes';
	import { setDoppelkopfService } from '$lib/services/doppelkopf.service.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import type { ComponentProps } from 'svelte';
	import { page } from '$app/state';
	import { useSidebar } from '$lib/components/ui/sidebar';
	import { setWizardService } from '$lib/services/wizard.service.svelte';
	import LightSwith from '$lib/components/light-swith/light-swith.svelte';

	let { children } = $props();

	let mobileOpen = $state(false);

	$inspect(mobileOpen);

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
		<!-- <Sidebar.Footer>
			<NavUser user={data.user} />
		</Sidebar.Footer> -->
	</Sidebar.Root>
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
		>
			<div class="flex w-full items-center justify-end gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<LightSwith />
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
<!-- 
<div class="flex min-h-screen w-full flex-col">
	<header
		class="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6"
	>
		<nav class="flex flex-row items-center gap-6 text-lg font-medium md:gap-5 md:text-sm lg:gap-6">
			<a
				use:activeNav
				href={routes.root}
				class="flex items-center gap-2 text-lg font-semibold md:text-base"
			>
				<Dices class="h-6 w-6" />
				<h1>SimpleScore</h1>
			</a>
			<a href={routes.players} class="text-foreground transition-colors hover:text-foreground">
				Players
			</a>
			<Popover.Root>
				<Popover.Trigger>Games</Popover.Trigger>
				<Popover.Content class="grid w-fit p-0">
					<a
						use:activeNav
						href={routes.maxchen}
						class="border-b p-2 text-foreground transition-colors hover:text-foreground"
					>
						Mäxchen
					</a>
					<a
						use:activeNav
						href={routes.doppelkopf}
						class="border-b p-2 text-foreground transition-colors hover:text-foreground"
					>
						Doppelkopf
					</a>
					<a
						use:activeNav
						href={routes.wizard}
						class="border-b p-2 text-foreground transition-colors hover:text-foreground"
					>
						Wizard
					</a>
				</Popover.Content>
			</Popover.Root>
		</nav>
		<LightSwith />
	</header>

	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8"></main>
</div> -->
