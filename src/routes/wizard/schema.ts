import type { Scores } from '$lib/components/add-score-per-player';
import { z } from 'zod';

export function getWizardSchema(maxTricks: number): z.ZodType<Scores> {
	return z.object({
		scores: z
			.object({
				playerName: z.string(),
				score: z
					.number({ message: 'Required' })
					.int({ message: 'Must be an intager' })
					.min(0, 'Tricks must be positive')
					.max(maxTricks, `Can not exceed ${maxTricks} tricks`)
			})
			.array()
	});
}

export function sumOfScores(scores: Scores['scores']) {
	return scores.reduce((sum, item) => sum + item.score, 0);
}
