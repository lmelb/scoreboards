import { MaxchenRound } from '$lib/models/Maxchen';
import type { Player } from '$lib/models/Player';
import { Context, PersistedState, StateHistory } from 'runed';

export class MaxchenService {
	private readonly roundsState = new PersistedState<MaxchenRound[]>('maxchen', [], {
		serializer: MaxchenRound.serializer()
	});

	readonly history: StateHistory<MaxchenRound[]>;

	readonly playerNames: string[];

	constructor(playerNames: string[]) {
		this.playerNames = playerNames;
		this.handlePlayerChange();
		this.history = new StateHistory<MaxchenRound[]>(
			() =>
				$state.snapshot(this.roundsState.current).map((it) => {
					const round = new MaxchenRound([]);
					round.scores = it.scores;
					return round;
				}),
			(c) => (this.roundsState.current = c)
		);
	}

	get rounds() {
		return this.roundsState.current;
	}

	get currentRound() {
		return this.rounds[this.rounds.length - 1];
	}

	newRound() {
		this.rounds.push(new MaxchenRound(this.playerNames));
	}

	looseRound(playerName: string) {
		this.roundsState.current[this.roundsState.current.length - 1].loose(playerName);
		this.roundsState.current = [...this.roundsState.current];
		if (
			this.currentRound.scores
				.values()
				.toArray()
				.some((score) => score >= 5)
		) {
			this.newRound();
		}
		console.log($state.snapshot(this.rounds));
	}

	reset() {
		this.roundsState.current = [];
		this.newRound();
	}

	private handlePlayerChange() {
		let playersHasChanged = false;
		this.roundsState.current.forEach((round) => {
			round.scores.keys().filter((playerName) => this.playerNames.includes(playerName));
			playersHasChanged = this.playerNames.some((name) => !round.scores.has(name));
		});

		if (playersHasChanged) this.newRound();

		this.roundsState.current = [...this.roundsState.current];
	}
}

const context = new Context<MaxchenService>('maxchen');

export function setMaxchenService(players: Player[]): MaxchenService {
	return context.set(new MaxchenService(players.map((it) => it.name)));
}

export function getMaxchenService(): MaxchenService {
	return context.get();
}
