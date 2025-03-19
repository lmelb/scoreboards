import { Round, RoundError } from './round';

export class MaxchenRound extends Round {
	scores = new Map<string, number>();

	constructor(playerNames: string[]) {
		super();
		playerNames.forEach((playerName) => {
			this.scores.set(playerName, 0);
		});
	}
	loose(playerName: string) {
		this.scores.set(playerName, this.scores.get(playerName)! + 1);
	}
}
