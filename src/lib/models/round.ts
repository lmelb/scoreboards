export class Round {
	equals(other: Round): boolean {
		return this === other;
	}
}

export class RoundError extends Error {
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, RoundError.prototype);
	}
}
