<script lang="ts">
	import WorldMap from '$lib/components/WorldMap.svelte';
	import RegionPanel from '$lib/components/RegionPanel.svelte';
</script>

<svelte:head>
	<title>Endangered Animals - An Interactive Map by Vir</title>
</svelte:head>

<main>
	<header class="hero">
		<div class="hero-icons">
			<span class="hero-icon icon-1">🌿</span>
			<span class="hero-icon icon-2">🐾</span>
			<span class="hero-icon icon-3">🌍</span>
		</div>
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
		<div class="wave-divider">
			<svg viewBox="0 0 1200 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0,60 C200,20 400,50 600,30 C800,10 1000,45 1200,25 L1200,60 L0,60 Z" fill="currentColor" />
			</svg>
		</div>
		<div class="footer-content">
			<p>Made with love by Vir</p>
			<p class="footer-note">
				Helping the world learn about animals that need our protection
			</p>
		</div>
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
		background: var(--gradient-hero);
		position: relative;
		overflow: hidden;
		animation: heroFadeIn 0.8s var(--ease-out-expo) both;
	}

	.hero-icons {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.hero-icon {
		position: absolute;
		font-size: 1.6rem;
		opacity: 0.15;
		animation: iconBob 4s ease-in-out infinite;
	}

	.icon-1 {
		top: 18%;
		left: 10%;
		animation-delay: 0s;
	}

	.icon-2 {
		top: 30%;
		right: 12%;
		animation-delay: 1.3s;
	}

	.icon-3 {
		bottom: 15%;
		left: 50%;
		animation-delay: 2.6s;
	}

	h1 {
		font-size: 2.4rem;
		font-weight: 800;
		margin-bottom: 8px;
		letter-spacing: -0.5px;
		background: linear-gradient(135deg, var(--forest-dark) 0%, var(--ocean-deep) 50%, var(--ocean-mid) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: heroFadeIn 0.8s var(--ease-out-expo) 0.15s both;
	}

	.subtitle {
		font-size: 1.1rem;
		color: var(--text-secondary);
		max-width: 500px;
		margin: 0 auto;
		line-height: 1.5;
		animation: heroFadeIn 0.8s var(--ease-out-expo) 0.3s both;
	}

	.map-section {
		padding: 0 20px 40px;
		flex: 1;
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
		font-size: 1rem;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.95);
	}

	.footer-note {
		font-size: 0.85rem !important;
		font-weight: 400 !important;
		color: rgba(255, 255, 255, 0.7) !important;
		margin-top: 4px;
	}

	@keyframes heroFadeIn {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes iconBob {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-8px);
		}
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

		.hero-icon {
			font-size: 1.2rem;
		}
	}
</style>
