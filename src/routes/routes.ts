import { base } from '$app/paths';
import { Dice1, Dices, Users, UsersRound, Wand, WandIcon } from 'lucide-svelte';

export const routes = {
	root: { icon: Dices, title: 'SimpleScore', url: `${base}/` },
	players: { icon: Users, title: 'Players', url: `${base}/players` },
	games: {
		maxchen: { icon: Dice1, title: 'Mäxchen', url: `${base}/maxchen` },
		doppelkopf: { icon: UsersRound, title: 'Doppelkopf', url: `${base}/doppelkopf` },
		wizard: { icon: Wand, title: 'Wizard', url: `${base}/wizard` }
	},
	privacy: { title: 'privacy policy', url: `${base}/privacy-policy` }
};
