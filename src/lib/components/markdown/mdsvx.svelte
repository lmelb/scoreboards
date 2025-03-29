<script lang="ts" module>
	import { ul } from './ul';
	export { ul };
</script>

<script lang="ts">
	let { children } = $props();
</script>

<div>
	{@render children?.()}
</div>
