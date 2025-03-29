<script lang="ts" module>
	import { ul } from './ul';
	export { ul };
</script>

<script lang="ts">
	let { children } = $props();
</script>

<div class=" container mx-auto max-w-4xl">
	{@render children?.()}
</div>
