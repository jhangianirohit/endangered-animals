<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<meta name="description" content="Discover endangered animals around the world - an interactive map by Vir" />
</svelte:head>

{@render children()}
