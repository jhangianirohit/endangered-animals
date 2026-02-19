<script lang="ts">
	import WorldMap from '$lib/components/WorldMap.svelte';
	import RegionPanel from '$lib/components/RegionPanel.svelte';
</script>

<svelte:head>
	<title>Endangered Animals - An Interactive Map by Vir</title>
</svelte:head>

<main>
	<header class="hero">
		<h1>Endangered Animals of the World</h1>
		<p class="subtitle">
			Click on a region to discover the amazing animals that need our help
		</p>
	</header>

	<section class="map-section">
		<WorldMap />
	</section>

	<RegionPanel />

	<footer>
		<p>Made with love by Vir</p>
		<p class="footer-note">
			Helping the world learn about animals that need our protection
		</p>
	</footer>
</main>

<style>
	main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.hero {
		text-align: center;
		padding: 40px 20px 24px;
	}

	h1 {
		font-size: 2.4rem;
		font-weight: 800;
		color: var(--forest-dark);
		margin-bottom: 8px;
		letter-spacing: -0.5px;
	}

	.subtitle {
		font-size: 1.1rem;
		color: var(--text-secondary);
		max-width: 500px;
		margin: 0 auto;
		line-height: 1.5;
	}

	.map-section {
		padding: 0 20px 40px;
		flex: 1;
	}

	footer {
		text-align: center;
		padding: 32px 20px;
		background: var(--earth-cream);
		border-top: 1px solid rgba(0, 0, 0, 0.06);
	}

	footer p {
		font-size: 1rem;
		font-weight: 700;
		color: var(--forest-dark);
	}

	.footer-note {
		font-size: 0.85rem !important;
		font-weight: 400 !important;
		color: var(--text-light) !important;
		margin-top: 4px;
	}

	@media (max-width: 640px) {
		h1 {
			font-size: 1.7rem;
		}

		.subtitle {
			font-size: 0.95rem;
		}

		.hero {
			padding: 28px 16px 16px;
		}

		.map-section {
			padding: 0 8px 24px;
		}
	}
</style>
