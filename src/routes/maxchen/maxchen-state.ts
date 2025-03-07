import { MaxchenRound } from '$lib/models/Maxchen';
import type { Player } from '$lib/models/Player';
import { Context, PersistedState } from 'runed';

export class MaxchenState {
	private readonly state: PersistedState<MaxchenRound[]>;
	readonly playerNames: string[];

	constructor(playerNames: string[]) {
		this.state = new PersistedState<MaxchenRound[]>('maxchen', [], {
			serializer: MaxchenRound.serializer()
		});

		this.playerNames = playerNames;

		let removedPlayer = false;
		this.state.current.forEach((round) => {
			round.scores = round.scores.filter((score) => {
				const playerExsits = this.playerNames.includes(score.playerName);
				if (!playerExsits) removedPlayer = true;
				return playerExsits;
			});
		});

		if (removedPlayer) this.newRound();
	}

	get rounds() {
		return this.state.current;
	}

	get currentRound() {
		return this.rounds[this.rounds.length - 1];
	}

	newRound() {
		this.rounds.push(new MaxchenRound(this.rounds.length, this.playerNames));
	}

	looseRound(playerName: string) {
		this.currentRound.loose(playerName);
		this.state.current = [...this.state.current];
		if (this.currentRound.scores.some((score) => score.value >= 5)) this.newRound();
	}

	reset() {
		this.state.current = [];
		this.newRound();
	}
}

const context = new Context<MaxchenState>('maxchen');

export function setMaxchenState(players: Player[]): MaxchenState {
	return context.set(new MaxchenState(players.map((it) => it.name)));
}

export function getMaxchenState(): MaxchenState {
	return context.get();
}
