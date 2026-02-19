<script lang="ts">
	import { onMount } from 'svelte';
	import { geoNaturalEarth1, geoPath } from 'd3-geo';
	import { feature } from 'topojson-client';
	import type { Topology } from 'topojson-specification';
	import { selectedRegion, hoveredRegion, regionNames } from '$lib/stores/app';
	import regionsData from '$lib/data/regions.json';

	let svgEl: SVGSVGElement;
	let width = $state(960);
	let height = $state(500);
	let features = $state<any[]>([]);
	let tooltipX = $state(0);
	let tooltipY = $state(0);

	const countryToRegion: Record<string, string> = regionsData.countryToRegion;
	const regionColors: Record<string, string> = {};
	for (const r of regionsData.regions) {
		regionColors[r.id] = r.color;
	}

	// Group features by region
	let regionFeatures = $derived.by(() => {
		const groups: Record<string, any[]> = {};
		for (const f of features) {
			const id = f.id || f.properties?.id;
			const region = countryToRegion[String(id)] || 'unknown';
			if (!groups[region]) groups[region] = [];
			groups[region].push(f);
		}
		return groups;
	});

	const projection = $derived.by(() => {
		return geoNaturalEarth1()
			.scale(width / 5.8)
			.translate([width / 2, height / 2]);
	});

	const path = $derived(geoPath(projection));

	let hovered = $derived($hoveredRegion);

	onMount(async () => {
		const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
		const topology: Topology = await res.json();
		const countries = feature(topology, topology.objects.countries as any);
		features = (countries as any).features;

		function handleResize() {
			if (svgEl?.parentElement) {
				width = svgEl.parentElement.clientWidth;
				height = Math.max(400, width * 0.52);
			}
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	function handleRegionClick(regionId: string) {
		if (regionId !== 'unknown') {
			selectedRegion.set(regionId);
		}
	}

	function handleMouseMove(e: MouseEvent) {
		tooltipX = e.clientX;
		tooltipY = e.clientY;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="map-container" onmousemove={handleMouseMove}>
	<svg bind:this={svgEl} viewBox="0 0 {width} {height}" class="map-svg">
		<!-- Ocean background -->
		<defs>
			<linearGradient id="ocean-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="#1a6e7a" />
				<stop offset="50%" stop-color="#0f5e6b" />
				<stop offset="100%" stop-color="#0b4f5c" />
			</linearGradient>
		</defs>
		<rect x="0" y="0" {width} {height} fill="url(#ocean-gradient)" rx="12" />

		<!-- Country paths grouped by region -->
		{#each Object.entries(regionFeatures) as [regionId, regionPaths]}
			<g
				class="region-group"
				class:hovered={hovered === regionId}
				class:dimmed={hovered !== null && hovered !== regionId}
				role="button"
				tabindex="0"
				aria-label={regionNames[regionId] || regionId}
				onclick={() => handleRegionClick(regionId)}
				onkeydown={(e) => { if (e.key === 'Enter') handleRegionClick(regionId); }}
				onmouseenter={() => { if (regionId !== 'unknown') hoveredRegion.set(regionId); }}
				onmouseleave={() => hoveredRegion.set(null)}
			>
				{#each regionPaths as f}
					<path
						d={path(f)}
						fill={regionColors[regionId] || '#6b9e5c'}
						stroke="rgba(255,255,255,0.4)"
						stroke-width="0.5"
					/>
				{/each}
			</g>
		{/each}

		<!-- Oceans clickable overlay (invisible rect, pointer-events: none so it's decorative) -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<rect
			x="0" y="0" {width} {height}
			fill="transparent"
			class="ocean-click"
			pointer-events="none"
		/>
	</svg>

	<!-- Ocean click area behind SVG -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<button
		class="ocean-btn"
		onclick={() => handleRegionClick('oceans')}
		onmouseenter={() => hoveredRegion.set('oceans')}
		onmouseleave={() => hoveredRegion.set(null)}
		aria-label="Oceans"
	>
		<span class="ocean-label">Click the ocean to explore marine animals</span>
	</button>

	{#if hovered}
		<div class="tooltip" style="left: {tooltipX + 14}px; top: {tooltipY - 14}px;">
			{regionNames[hovered] || hovered}
		</div>
	{/if}
</div>

<style>
	.map-container {
		position: relative;
		width: 100%;
		max-width: 1100px;
		margin: 0 auto;
	}

	.map-svg {
		display: block;
		width: 100%;
		height: auto;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		cursor: pointer;
	}

	.region-group {
		transition: opacity 0.2s, filter 0.2s;
		cursor: pointer;
		outline: none;
	}

	.region-group path {
		transition: filter 0.2s, stroke-width 0.2s;
	}

	.region-group.hovered path {
		filter: brightness(1.2) saturate(1.2);
		stroke-width: 1;
		stroke: rgba(255, 255, 255, 0.8);
	}

	.region-group.dimmed {
		opacity: 0.7;
	}

	.region-group:focus-visible path {
		stroke: white;
		stroke-width: 2;
	}

	.ocean-btn {
		position: absolute;
		bottom: 16px;
		left: 50%;
		transform: translateX(-50%);
		padding: 8px 20px;
		background: rgba(11, 79, 108, 0.85);
		backdrop-filter: blur(4px);
		border-radius: 24px;
		cursor: pointer;
		transition: background 0.2s;
	}

	.ocean-btn:hover {
		background: rgba(11, 79, 108, 0.95);
	}

	.ocean-label {
		color: rgba(255, 255, 255, 0.9);
		font-size: 0.8rem;
		font-weight: 600;
	}

	.tooltip {
		position: fixed;
		pointer-events: none;
		background: rgba(44, 44, 44, 0.9);
		color: white;
		padding: 6px 14px;
		border-radius: 8px;
		font-size: 0.85rem;
		font-weight: 600;
		z-index: 50;
		white-space: nowrap;
		backdrop-filter: blur(4px);
	}
</style>
