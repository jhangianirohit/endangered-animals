<script lang="ts">
	import type { Animal } from '$lib/stores/app';
	import ConservationBadge from './ConservationBadge.svelte';

	let { animal, index = 0, onclick }: { animal: Animal; index?: number; onclick: () => void } = $props();

	let imageError = $state(false);
</script>

<button
	class="card"
	style="animation-delay: {index * 60}ms"
	onclick={onclick}
>
	<div class="card-image">
		{#if !imageError}
			<img
				src={animal.image}
				alt={animal.name}
				loading="lazy"
				onerror={() => (imageError = true)}
			/>
		{:else}
			<div class="image-placeholder">
				<span class="placeholder-icon">🦁</span>
				<span class="placeholder-text">{animal.name}</span>
			</div>
		{/if}
		<div class="badge-overlay">
			<ConservationBadge status={animal.status} />
		</div>
	</div>
	<div class="card-body">
		<h3 class="card-title">{animal.name}</h3>
		<p class="card-scientific">{animal.scientificName}</p>
		<p class="card-desc">{animal.description}</p>
	</div>
</button>

<style>
	.card {
		background: var(--warm-white);
		border-radius: var(--radius-md);
		overflow: hidden;
		box-shadow: var(--shadow-sm);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		cursor: pointer;
		text-align: left;
		width: 100%;
		animation: cardIn 0.4s ease both;
	}

	.card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
	}

	.card-image {
		position: relative;
		width: 100%;
		height: 180px;
		overflow: hidden;
		background: var(--earth-cream);
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		background: var(--earth-cream);
		transition: transform 0.3s ease;
	}

	.card:hover .card-image img {
		transform: scale(1.05);
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--earth-cream), var(--earth-sand));
	}

	.placeholder-icon {
		font-size: 3rem;
	}

	.placeholder-text {
		margin-top: 4px;
		font-size: 0.85rem;
		color: var(--text-secondary);
		font-weight: 600;
	}

	.badge-overlay {
		position: absolute;
		top: 8px;
		right: 8px;
	}

	.card-body {
		padding: 14px 16px 16px;
	}

	.card-title {
		font-size: 1.05rem;
		font-weight: 800;
		color: var(--text-primary);
		margin-bottom: 2px;
	}

	.card-scientific {
		font-size: 0.78rem;
		color: var(--text-light);
		font-style: italic;
		margin-bottom: 8px;
	}

	.card-desc {
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.45;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	@keyframes cardIn {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
