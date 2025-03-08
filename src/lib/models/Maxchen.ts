export class MaxchenRound {
	scores = new Map<string, number>();

	constructor(playerNames: string[]) {
		playerNames.forEach((playerName) => {
			this.scores.set(playerName, 0);
		});
	}

	loose(playerName: string) {
		this.scores.set(playerName, this.scores.get(playerName)! + 1);
	}

	static serializer(): MaxchenSerializer {
		return {
			serialize: (value) =>
				JSON.stringify(value.map((round) => Array.from(round.scores.entries()))),
			deserialize: (data) =>
				JSON.parse(data).map((round: [string, number][]) => {
					const maxchenRound = new MaxchenRound([]);
					maxchenRound.scores = new Map<string, number>(round);
					return maxchenRound;
				})
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
