import { writable, derived } from 'svelte/store';
import animalsData from '$lib/data/animals.json';

export interface Animal {
	id: string;
	name: string;
	scientificName: string;
	status: 'CR' | 'EN' | 'VU' | 'NT';
	population: string;
	region: string;
	habitat: string;
	image: string;
	description: string;
	funFacts: string[];
	threats: string[];
	whatYouCanDo: string[];
}

export const animals: Animal[] = animalsData as Animal[];

export const selectedRegion = writable<string | null>(null);
export const selectedAnimal = writable<Animal | null>(null);
export const hoveredRegion = writable<string | null>(null);

export const regionAnimals = derived(selectedRegion, ($selectedRegion) => {
	if (!$selectedRegion) return [];
	return animals.filter((a) => a.region === $selectedRegion);
});

export function getAnimalBySlug(slug: string): Animal | undefined {
	return animals.find((a) => a.id === slug);
}

export const statusLabels: Record<string, string> = {
	CR: 'Critically Endangered',
	EN: 'Endangered',
	VU: 'Vulnerable',
	NT: 'Near Threatened'
};

export const statusColors: Record<string, string> = {
	CR: 'var(--status-cr)',
	EN: 'var(--status-en)',
	VU: 'var(--status-vu)',
	NT: 'var(--status-nt)'
};

export const regionNames: Record<string, string> = {
	'north-america': 'North America',
	'central-america-caribbean': 'Central America & Caribbean',
	'south-america': 'South America',
	'west-central-africa': 'West & Central Africa',
	'east-southern-africa': 'East & Southern Africa',
	'europe': 'Europe',
	'middle-east-central-asia': 'Middle East & Central Asia',
	'south-asia': 'South Asia',
	'southeast-asia': 'Southeast Asia',
	'east-asia': 'East Asia',
	'oceania-australia': 'Oceania & Australia',
	'arctic': 'Arctic',
	'oceans': 'Oceans'
};
