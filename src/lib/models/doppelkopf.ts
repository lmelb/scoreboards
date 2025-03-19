export type DoppelkopfRound = {
	playerScores: {
		playerName: string;
		score: number;
	}[];
	score: number;
	isSolo: boolean;
};
