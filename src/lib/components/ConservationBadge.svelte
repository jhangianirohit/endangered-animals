<script lang="ts">
	import { statusLabels, statusColors } from '$lib/stores/app';

	let { status }: { status: string } = $props();

	const label = $derived(statusLabels[status] || status);
	const color = $derived(statusColors[status] || '#888');
</script>

<span class="badge" style="background: {color}">
	{label}
</span>

<style>
	.badge {
		display: inline-block;
		padding: 3px 10px;
		border-radius: 20px;
		font-size: 0.7rem;
		font-weight: 700;
		color: white;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		white-space: nowrap;
	}
</style>
