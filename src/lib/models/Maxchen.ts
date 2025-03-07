import { check } from '$lib/utils';
import type { Tally1 } from 'lucide-svelte';

export class Score {
	playerName: string;
	value: number;
	constructor(playerName: string, value: number) {
		this.playerName = playerName;
		this.value = value;
	}
}
export class MaxchenRound {
	readonly index: number;
	scores: Score[];

	constructor(index: number, playerNames: string[], scores?: Score[]) {
		this.index = index;
		this.scores = playerNames.map((playerName) => new Score(playerName, 0));

		if (scores) this.scores = scores;
	}

	loose(playerName: string) {
		this.scores = this.scores.map((score) => {
			if (score.playerName === playerName) score.value++;
			return score;
		});
	}

	static serializer(): MaxchenSerializer {
		return {
			serialize: (value: MaxchenRound[]) => JSON.stringify(value),
			deserialize: (data) =>
				JSON.parse(data).map(
					(d: MaxchenRound) =>
						new MaxchenRound(
							d.index,
							[],
							d.scores.map((score) => new Score(score.playerName, score.value))
						)
				)
		};
	}
}

export type MaxchenSerializer = {
	serialize: (value: MaxchenRound[]) => string;
	deserialize: (value: string) => MaxchenRound[];
};

export class MaxchenError extends Error {
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, MaxchenError.prototype);
	}
}
