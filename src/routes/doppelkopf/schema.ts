import { z } from 'zod';

export const formSchema = z
	.object({
		winners: z.array(z.string()),
		losers: z.array(z.string()),
		score: z.number().min(1).max(18),
		isSolo: z.boolean()
	})
	.refine((val) => (val.isSolo ? val.winners.length === 1 : true), {
		message: 'A solo requires 1 winner.',
		path: ['winners']
	})
	.refine((val) => (!val.isSolo ? val.winners.length === 2 : true), {
		message: 'Select 2 winners.',
		path: ['winners']
	})
	.refine((val) => (val.isSolo ? val.losers.length === 3 : true), {
		message: 'A solo requires 3 losers.',
		path: ['losers']
	})
	.refine((val) => (!val.isSolo ? val.losers.length === 2 : true), {
		message: 'Select 2 losers.',
		path: ['losers']
	})
	.refine((val) => !val.losers.some((loser) => val.winners.includes(loser)), {
		message: 'Losers cannot also be winners',
		path: ['losers']
	});
