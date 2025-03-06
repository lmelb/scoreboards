<script lang="ts">
	import { CircleX, X } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { Badge, type BadgeVariant } from '../ui/badge';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { WithElementRef } from 'bits-ui';
	import { cn } from '$lib/utils';

	let {
		close,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		close: () => void;
	} = $props();
</script>

<Badge variant="secondary" class={cn('flex gap-1 py-1 pe-1 ps-3', className)} {...restProps}>
	{@render children?.()}
	<Button
		class="h-auto w-auto rounded-full bg-primary/10 p-1 text-primary/60 hover:bg-primary/20 "
		variant="ghost"
		size="icon"
		onclick={close}
	>
		<X style="height: 0.75rem; width: 0.75rem;" />
	</Button>
</Badge>
