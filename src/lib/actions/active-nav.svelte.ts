import { page } from '$app/state';

export function activeNav(node: HTMLAnchorElement) {
	const href = node.getAttribute('href');
	$effect(() => {
		const currentPath = page.url.pathname;
		if (href === currentPath) {
			node.classList.add('font-bold');
		} else {
			node.classList.remove('font-bold');
		}
	});
}
