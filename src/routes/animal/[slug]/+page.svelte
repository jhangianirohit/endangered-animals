<script lang="ts">
	import { base } from '$app/paths';
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
		<a href="{base}/">← Back to Map</a>
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
				<a href="{base}/">← Explore more animals on the map</a>
			</div>
		</div>
	</article>

	<footer>
		<div class="wave-divider">
			<svg viewBox="0 0 1200 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0,60 C200,20 400,50 600,30 C800,10 1000,45 1200,25 L1200,60 L0,60 Z" fill="currentColor" />
			</svg>
		</div>
		<div class="footer-content">
			<p>Made with love by Vir</p>
		</div>
	</footer>
</div>

<style>
	.page {
		min-height: 100vh;
		background:
			radial-gradient(ellipse 600px 400px at 15% 20%, rgba(45, 90, 39, 0.03) 0%, transparent 70%),
			radial-gradient(ellipse 500px 500px at 85% 60%, rgba(26, 122, 138, 0.03) 0%, transparent 70%),
			var(--sand-bg);
	}

	.breadcrumb {
		padding: 16px 24px;
		max-width: 800px;
		margin: 0 auto;
	}

	.breadcrumb a {
		display: inline-block;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--ocean-mid);
		transition: transform var(--duration-fast) var(--ease-smooth);
	}

	.breadcrumb a:hover {
		transform: translateX(-3px);
		text-decoration: none;
	}

	.animal-page {
		max-width: 800px;
		margin: 0 auto;
		background: var(--warm-white);
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-lg);
		margin-bottom: 40px;
		animation: pageIn 0.6s var(--ease-out-expo) both;
	}

	.hero-image {
		width: 100%;
		height: 400px;
		overflow: hidden;
		background: var(--earth-cream);
		position: relative;
	}

	.hero-image::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80px;
		background: linear-gradient(to top, var(--warm-white) 0%, transparent 100%);
		pointer-events: none;
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
		background: var(--warm-white);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-sm);
		border-left: 3px solid var(--ocean-mid);
		transition:
			transform var(--duration-normal) var(--ease-spring),
			box-shadow var(--duration-normal) var(--ease-smooth);
	}

	.stat-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
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
		padding: 16px 20px;
		background: rgba(245, 240, 232, 0.35);
		border-radius: var(--radius-sm);
		border: 1px solid rgba(0, 0, 0, 0.04);
	}

	h2 {
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--forest-dark);
		margin-bottom: 12px;
		padding-left: 12px;
		border-left: 3px solid var(--ocean-mid);
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
		display: inline-block;
		padding: 10px 20px;
		background: linear-gradient(135deg, var(--ocean-mid) 0%, var(--ocean-deep) 100%);
		color: white;
		border-radius: var(--radius-sm);
		font-weight: 700;
		font-size: 0.95rem;
		transition:
			transform var(--duration-normal) var(--ease-spring),
			box-shadow var(--duration-normal) var(--ease-smooth);
	}

	.back-link a:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md), var(--shadow-glow-ocean);
		text-decoration: none;
	}

	footer {
		position: relative;
		margin-top: auto;
	}

	.wave-divider {
		position: relative;
		height: 40px;
		overflow: hidden;
		color: var(--forest-dark);
	}

	.wave-divider svg {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 100%;
	}

	.footer-content {
		text-align: center;
		padding: 28px 20px 36px;
		background: var(--gradient-footer);
	}

	.footer-content p {
		font-weight: 700;
		color: rgba(255, 255, 255, 0.95);
		font-size: 0.9rem;
	}

	@keyframes pageIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
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
