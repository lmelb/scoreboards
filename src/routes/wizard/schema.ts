import { z } from 'zod';

export const wizardSchema = z.object({
	scores: z
		.object({
			playerName: z.string(),
			score: z.number({ message: 'Required' }).int({ message: 'Must be an intager' }).min(0)
		})
		.array()
});
