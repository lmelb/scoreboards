<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { getDoppelkopfService } from '$lib/services/doppelkopf.service.svelte';
	import { getWizardService } from '$lib/services/wizard.service.svelte';
	import { RotateCw, Settings, Undo } from 'lucide-svelte';

	const service = getWizardService();
</script>

<div class="flex justify-end">
	<Button
		size="icon"
		variant="ghost"
		disabled={!service.history.canUndo}
		onclick={service.history.undo}><Undo /></Button
	>
	<Button size="icon" variant="ghost" onclick={() => service.reset()}><RotateCw /></Button>
</div>
