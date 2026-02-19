<script lang="ts">
	import type { Animal } from '$lib/stores/app';
	import { selectedAnimal } from '$lib/stores/app';
	import AnimalCard from './AnimalCard.svelte';

	let { animals }: { animals: Animal[] } = $props();
</script>

<div class="grid">
	{#each animals as animal, i (animal.id)}
		<AnimalCard {animal} index={i} onclick={() => selectedAnimal.set(animal)} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 20px;
		padding: 4px;
	}
</style>
