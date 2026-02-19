<script lang="ts">
	import { selectedRegion, regionAnimals, regionNames, selectedAnimal } from '$lib/stores/app';
	import AnimalGrid from './AnimalGrid.svelte';
	import AnimalModal from './AnimalModal.svelte';
	import regionsData from '$lib/data/regions.json';

	let regionId = $derived($selectedRegion);
	let animals = $derived($regionAnimals);
	let regionName = $derived(regionId ? regionNames[regionId] || regionId : '');
	let modalAnimal = $derived($selectedAnimal);

	const regionColorMap: Record<string, string> = {};
	for (const r of regionsData.regions) {
		regionColorMap[r.id] = r.color;
	}

	let regionColor = $derived(regionId ? regionColorMap[regionId] || '#6b9e5c' : '#6b9e5c');

	function close() {
		selectedRegion.set(null);
		selectedAnimal.set(null);
	}
</script>

{#if regionId}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="panel-backdrop" onclick={close}></div>
	<div
		class="panel"
		role="dialog"
		aria-label="{regionName} endangered animals"
		style="--region-color: {regionColor}"
	>
		<div class="panel-stripe"></div>
		<div class="panel-header">
			<div>
				<h2>{regionName}</h2>
				<p class="count">{animals.length} endangered species</p>
			</div>
			<button class="close-btn" onclick={close} aria-label="Close panel">
				✕
			</button>
		</div>

		<div class="panel-body">
			{#if animals.length > 0}
				<AnimalGrid {animals} />
			{:else}
				<p class="empty">No animals found for this region yet.</p>
			{/if}
		</div>
	</div>
{/if}

{#if modalAnimal}
	<AnimalModal animal={modalAnimal} />
{/if}

<style>
	.panel-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		z-index: 90;
		animation: fadeIn 0.2s var(--ease-smooth);
	}

	.panel {
		position: fixed;
		top: 0;
		right: 0;
		width: min(520px, 90vw);
		height: 100vh;
		background: var(--glass-bg);
		backdrop-filter: blur(20px) saturate(1.2);
		-webkit-backdrop-filter: blur(20px) saturate(1.2);
		z-index: 100;
		display: flex;
		flex-direction: column;
		box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15), -1px 0 0 var(--glass-border);
		animation: slideIn 0.4s var(--ease-spring);
	}

	.panel-stripe {
		height: 4px;
		background: var(--region-color);
		flex-shrink: 0;
	}

	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px 24px 16px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.06);
		flex-shrink: 0;
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--region-color) 8%, transparent) 0%,
			transparent 100%
		);
	}

	h2 {
		font-size: 1.4rem;
		font-weight: 800;
		color: var(--forest-dark);
	}

	.count {
		font-size: 0.85rem;
		color: var(--text-light);
		margin-top: 2px;
	}

	.close-btn {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--earth-cream);
		font-size: 1.1rem;
		color: var(--text-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			background var(--duration-fast) var(--ease-smooth),
			transform var(--duration-normal) var(--ease-spring);
		flex-shrink: 0;
	}

	.close-btn:hover {
		background: var(--earth-sand);
		transform: scale(1.05);
	}

	.panel-body {
		flex: 1;
		overflow-y: auto;
		padding: 20px 24px 24px;
	}

	.empty {
		text-align: center;
		color: var(--text-light);
		padding: 40px 0;
		font-size: 0.95rem;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes slideIn {
		from { transform: translateX(100%); }
		to { transform: translateX(0); }
	}

	@media (max-width: 640px) {
		.panel {
			width: 100vw;
			top: auto;
			bottom: 0;
			height: 85vh;
			border-radius: var(--radius-lg) var(--radius-lg) 0 0;
			animation: slideUp 0.4s var(--ease-spring);
		}

		@keyframes slideUp {
			from { transform: translateY(100%); }
			to { transform: translateY(0); }
		}
	}
</style>
