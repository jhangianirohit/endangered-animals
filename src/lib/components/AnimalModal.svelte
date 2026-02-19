<script lang="ts">
	import { base } from '$app/paths';
	import type { Animal } from '$lib/stores/app';
	import { selectedAnimal } from '$lib/stores/app';
	import ConservationBadge from './ConservationBadge.svelte';

	let { animal }: { animal: Animal } = $props();
	let imageError = $state(false);

	function close() {
		selectedAnimal.set(null);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="overlay" onclick={close}>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="modal" onclick={(e) => e.stopPropagation()}>
		<button class="close-btn" onclick={close} aria-label="Close">✕</button>

		<div class="modal-image">
			{#if !imageError}
				<img
					src={animal.image}
					alt={animal.name}
					onerror={() => (imageError = true)}
				/>
			{:else}
				<div class="image-placeholder">
					<span class="placeholder-icon">🦁</span>
				</div>
			{/if}
		</div>

		<div class="modal-content">
			<div class="modal-header">
				<div>
					<h2>{animal.name}</h2>
					<p class="scientific">{animal.scientificName}</p>
				</div>
				<ConservationBadge status={animal.status} />
			</div>

			<div class="stats">
				<div class="stat">
					<span class="stat-label">Population</span>
					<span class="stat-value">{animal.population}</span>
				</div>
				<div class="stat">
					<span class="stat-label">Habitat</span>
					<span class="stat-value">{animal.habitat}</span>
				</div>
			</div>

			<p class="description">{animal.description}</p>

			<div class="section">
				<h3>Fun Facts</h3>
				<ul class="fun-facts">
					{#each animal.funFacts as fact}
						<li>{fact}</li>
					{/each}
				</ul>
			</div>

			<div class="section">
				<h3>Threats</h3>
				<ul class="threats">
					{#each animal.threats as threat}
						<li>{threat}</li>
					{/each}
				</ul>
			</div>

			<div class="section">
				<h3>What You Can Do</h3>
				<ul class="actions">
					{#each animal.whatYouCanDo as action}
						<li>{action}</li>
					{/each}
				</ul>
			</div>

			<a href="{base}/animal/{animal.id}" class="share-link" onclick={close}>
				Share this animal's page →
			</a>
		</div>
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		animation: fadeIn 0.2s var(--ease-smooth);
		overflow-y: auto;
	}

	.modal {
		background: var(--warm-white);
		border-radius: var(--radius-lg);
		max-width: 600px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		position: relative;
		box-shadow: var(--shadow-lift);
		animation: modalSlideUp 0.4s var(--ease-spring);
	}

	.close-btn {
		position: absolute;
		top: 12px;
		right: 12px;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		color: white;
		font-size: 1.1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		transition:
			background var(--duration-fast) var(--ease-smooth),
			transform var(--duration-normal) var(--ease-spring);
	}

	.close-btn:hover {
		background: rgba(0, 0, 0, 0.7);
		transform: scale(1.1);
	}

	.modal-image {
		width: 100%;
		height: 280px;
		overflow: hidden;
		border-radius: var(--radius-lg) var(--radius-lg) 0 0;
		background: var(--earth-cream);
		position: relative;
	}

	.modal-image::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 60px;
		background: linear-gradient(to top, var(--warm-white) 0%, transparent 100%);
		pointer-events: none;
	}

	.modal-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		background: var(--earth-cream);
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 5rem;
		background: linear-gradient(135deg, var(--earth-cream), var(--earth-sand));
	}

	.modal-content {
		padding: 24px;
	}

	.modal-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 16px;
	}

	h2 {
		font-size: 1.6rem;
		font-weight: 800;
		color: var(--text-primary);
	}

	.scientific {
		font-style: italic;
		color: var(--text-light);
		font-size: 0.9rem;
		margin-top: 2px;
	}

	.stats {
		display: flex;
		gap: 24px;
		margin-bottom: 16px;
		padding: 12px 16px;
		background: rgba(245, 240, 232, 0.7);
		border-radius: var(--radius-sm);
		border-left: 3px solid var(--ocean-mid);
		box-shadow: var(--shadow-inner-soft);
	}

	.stat-label {
		display: block;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--text-light);
		font-weight: 700;
	}

	.stat-value {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.description {
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--text-secondary);
		margin-bottom: 20px;
	}

	.section {
		margin-bottom: 18px;
		padding: 14px 16px;
		background: rgba(245, 240, 232, 0.35);
		border-radius: var(--radius-sm);
		border: 1px solid rgba(0, 0, 0, 0.04);
	}

	h3 {
		font-size: 1rem;
		font-weight: 700;
		color: var(--forest-dark);
		margin-bottom: 8px;
		padding-left: 10px;
		border-left: 3px solid var(--ocean-mid);
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		position: relative;
		padding-left: 20px;
		margin-bottom: 6px;
		font-size: 0.9rem;
		line-height: 1.5;
		color: var(--text-secondary);
	}

	.fun-facts li::before {
		content: '✨';
		position: absolute;
		left: 0;
	}

	.threats li::before {
		content: '⚠️';
		position: absolute;
		left: 0;
		font-size: 0.8rem;
	}

	.actions li::before {
		content: '💚';
		position: absolute;
		left: 0;
		font-size: 0.8rem;
	}

	.share-link {
		display: inline-block;
		margin-top: 8px;
		padding: 10px 20px;
		background: linear-gradient(135deg, var(--ocean-mid) 0%, var(--ocean-deep) 100%);
		color: white;
		border-radius: var(--radius-sm);
		font-weight: 700;
		font-size: 0.9rem;
		transition:
			transform var(--duration-normal) var(--ease-spring),
			box-shadow var(--duration-normal) var(--ease-smooth);
	}

	.share-link:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md), var(--shadow-glow-ocean);
		text-decoration: none;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes modalSlideUp {
		from {
			opacity: 0;
			transform: translateY(32px) scale(0.97);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@media (max-width: 640px) {
		.modal {
			max-height: 95vh;
			border-radius: var(--radius-md) var(--radius-md) 0 0;
			margin-top: auto;
		}

		.modal-image {
			height: 200px;
		}

		.overlay {
			align-items: flex-end;
			padding: 0;
		}

		.stats {
			flex-direction: column;
			gap: 8px;
		}
	}
</style>
