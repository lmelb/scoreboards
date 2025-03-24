import { base } from '$app/paths';
import { Dice1 } from 'lucide-svelte';

export const routes = {
	root: { icon: Dice1, title: 'SimpleScore', url: `${base}/` },
	players: { icon: Dice1, title: 'Players', url: `${base}/players` },
	games: {
		maxchen: { icon: Dice1, title: 'Mäxchen', url: `${base}/maxchen` },
		doppelkopf: { icon: Dice1, title: 'Doppelkopf', url: `${base}/doppelkopf` },
		wizard: { icon: Dice1, title: 'Wizard', url: `${base}/wizard` }
	}
};
