<script lang="ts">
	import { statusLabels, statusColors } from '$lib/stores/app';

	let { status }: { status: string } = $props();

	const label = $derived(statusLabels[status] || status);
	const color = $derived(statusColors[status] || '#888');

	const isCR = $derived(status === 'CR');
</script>

<span
	class="badge"
	class:cr={isCR}
	style="--badge-color: {color}"
>
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
		background: linear-gradient(135deg, var(--badge-color), color-mix(in srgb, var(--badge-color) 80%, black));
		box-shadow:
			0 2px 6px color-mix(in srgb, var(--badge-color) 40%, transparent),
			inset 0 1px 0 rgba(255, 255, 255, 0.25);
		border: 1px solid rgba(255, 255, 255, 0.15);
		position: relative;
	}

	.badge.cr {
		animation: crPulse 2s ease-in-out infinite;
	}

	@keyframes crPulse {
		0%, 100% {
			box-shadow:
				0 2px 6px color-mix(in srgb, var(--badge-color) 40%, transparent),
				inset 0 1px 0 rgba(255, 255, 255, 0.25),
				0 0 0 0 rgba(211, 47, 47, 0.4);
		}
		50% {
			box-shadow:
				0 2px 6px color-mix(in srgb, var(--badge-color) 40%, transparent),
				inset 0 1px 0 rgba(255, 255, 255, 0.25),
				0 0 0 6px rgba(211, 47, 47, 0);
		}
	}
</style>
