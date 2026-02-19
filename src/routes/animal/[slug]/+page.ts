import { getAnimalBySlug, animals } from '$lib/stores/app';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const animal = getAnimalBySlug(params.slug);
	if (!animal) {
		throw error(404, 'Animal not found');
	}
	return { animal };
};

export function entries() {
	return animals.map((a) => ({ slug: a.id }));
}
