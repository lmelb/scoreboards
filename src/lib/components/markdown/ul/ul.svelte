<script lang="ts">
	let { children } = $props();
</script>

<ul class="ms-6 list-disc text-sm text-muted-foreground">
	{@render children?.()}
</ul>
