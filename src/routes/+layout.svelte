<script lang="ts">
	import { setPlayersService } from '$lib/services/player.service';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { Dices } from 'lucide-svelte';
	import LightSwith from '$lib/components/ui/button/light-swith/light-swith.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { activeNav } from '$lib/actions/active-nav.svelte';

	let { children } = $props();

	setPlayersService();
</script>

<ModeWatcher />
<Toaster />

<div class="flex min-h-screen w-full flex-col">
	<header
		class="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6"
	>
		<nav class="flex flex-row items-center gap-6 text-lg font-medium md:gap-5 md:text-sm lg:gap-6">
			<a use:activeNav href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
				<Dices class="h-6 w-6" />
				<h1>GameScore</h1>
			</a>
			<a
				use:activeNav
				href="/players"
				class="text-foreground transition-colors hover:text-foreground"
			>
				Players
			</a>
			<a
				use:activeNav
				href="/maxchen"
				class="text-foreground transition-colors hover:text-foreground"
			>
				Mäxchen
			</a>
		</nav>
		<LightSwith />
	</header>

	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		{@render children()}
	</main>
</div>
