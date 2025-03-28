import type { Snippet } from 'svelte';
import type { z } from 'zod';

export { default as AddScorePerPlayer } from './add-score-per-player.svelte';
export type Scores = {
	scores: {
		playerName: string;
		score: number;
	}[];
};
export type AddScorePerPlayerProps = {
	schema: z.ZodType<Scores>;
	playerNames: string[];
	onsubmit: (data: z.infer<z.ZodType<Scores>>) => void;
	children: Snippet;
};
