<script lang="ts">
	import { setPlayersState } from '$lib/playerState';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { Dices } from 'lucide-svelte';
	import LightSwith from '$lib/components/ui/button/light-swith/light-swith.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	let { children } = $props();

	setPlayersState();
</script>

<ModeWatcher />
<Toaster />

<div class="flex min-h-screen w-full flex-col">
	<header
		class="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6"
	>
		<nav class="flex flex-row items-center gap-6 text-lg font-medium md:gap-5 md:text-sm lg:gap-6">
			<a href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
				<Dices class="h-6 w-6" />
				<h1>GameScore</h1>
			</a>
			<a href="/players" class="text-foreground transition-colors hover:text-foreground">
				Players
			</a>
		</nav>
		<LightSwith />
	</header>

	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		{@render children()}
	</main>
</div>
