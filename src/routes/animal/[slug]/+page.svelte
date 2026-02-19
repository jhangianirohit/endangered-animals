<script lang="ts">
	import ConservationBadge from '$lib/components/ConservationBadge.svelte';
	import { regionNames } from '$lib/stores/app';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let animal = $derived(data.animal);

	let imageError = $state(false);
</script>

<svelte:head>
	<title>{animal.name} - Endangered Animals by Vir</title>
	<meta name="description" content="{animal.description}" />
</svelte:head>

<div class="page">
	<nav class="breadcrumb">
		<a href="/">← Back to Map</a>
	</nav>

	<article class="animal-page">
		<div class="hero-image">
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

		<div class="content">
			<div class="header">
				<div>
					<h1>{animal.name}</h1>
					<p class="scientific">{animal.scientificName}</p>
				</div>
				<ConservationBadge status={animal.status} />
			</div>

			<div class="stats-row">
				<div class="stat-card">
					<span class="stat-label">Population</span>
					<span class="stat-value">{animal.population}</span>
				</div>
				<div class="stat-card">
					<span class="stat-label">Habitat</span>
					<span class="stat-value">{animal.habitat}</span>
				</div>
				<div class="stat-card">
					<span class="stat-label">Region</span>
					<span class="stat-value">{regionNames[animal.region] || animal.region}</span>
				</div>
			</div>

			<p class="description">{animal.description}</p>

			<section class="section">
				<h2>Fun Facts</h2>
				<ul class="fun-facts">
					{#each animal.funFacts as fact}
						<li>{fact}</li>
					{/each}
				</ul>
			</section>

			<section class="section">
				<h2>Threats</h2>
				<ul class="threats">
					{#each animal.threats as threat}
						<li>{threat}</li>
					{/each}
				</ul>
			</section>

			<section class="section">
				<h2>What You Can Do to Help</h2>
				<ul class="actions">
					{#each animal.whatYouCanDo as action}
						<li>{action}</li>
					{/each}
				</ul>
			</section>

			<div class="back-link">
				<a href="/">← Explore more animals on the map</a>
			</div>
		</div>
	</article>

	<footer>
		<p>Made with love by Vir</p>
	</footer>
</div>

<style>
	.page {
		min-height: 100vh;
		background: var(--sand-bg);
	}

	.breadcrumb {
		padding: 16px 24px;
		max-width: 800px;
		margin: 0 auto;
	}

	.breadcrumb a {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--ocean-mid);
	}

	.animal-page {
		max-width: 800px;
		margin: 0 auto;
		background: var(--warm-white);
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-md);
		margin-bottom: 40px;
	}

	.hero-image {
		width: 100%;
		height: 400px;
		overflow: hidden;
		background: var(--earth-cream);
	}

	.hero-image img {
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
		font-size: 6rem;
		background: linear-gradient(135deg, var(--earth-cream), var(--earth-sand));
	}

	.content {
		padding: 32px;
	}

	.header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 24px;
	}

	h1 {
		font-size: 2rem;
		font-weight: 800;
		color: var(--text-primary);
	}

	.scientific {
		font-style: italic;
		color: var(--text-light);
		font-size: 1rem;
		margin-top: 4px;
	}

	.stats-row {
		display: flex;
		gap: 16px;
		margin-bottom: 24px;
		flex-wrap: wrap;
	}

	.stat-card {
		flex: 1;
		min-width: 140px;
		padding: 14px 18px;
		background: var(--earth-cream);
		border-radius: var(--radius-sm);
	}

	.stat-label {
		display: block;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--text-light);
		font-weight: 700;
		margin-bottom: 4px;
	}

	.stat-value {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.description {
		font-size: 1.05rem;
		line-height: 1.7;
		color: var(--text-secondary);
		margin-bottom: 28px;
	}

	.section {
		margin-bottom: 24px;
	}

	h2 {
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--forest-dark);
		margin-bottom: 12px;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		position: relative;
		padding-left: 24px;
		margin-bottom: 8px;
		font-size: 0.95rem;
		line-height: 1.6;
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
		font-size: 0.85rem;
	}

	.actions li::before {
		content: '💚';
		position: absolute;
		left: 0;
		font-size: 0.85rem;
	}

	.back-link {
		margin-top: 32px;
		padding-top: 20px;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
	}

	.back-link a {
		font-weight: 700;
		font-size: 0.95rem;
		color: var(--ocean-mid);
	}

	footer {
		text-align: center;
		padding: 24px;
		color: var(--text-light);
		font-size: 0.9rem;
	}

	footer p {
		font-weight: 700;
		color: var(--forest-dark);
	}

	@media (max-width: 640px) {
		.hero-image {
			height: 240px;
		}

		.content {
			padding: 20px;
		}

		h1 {
			font-size: 1.5rem;
		}

		.header {
			flex-direction: column;
			gap: 8px;
		}

		.stats-row {
			flex-direction: column;
		}
	}
</style>
