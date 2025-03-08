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
				$state
					.snapshot(this.roundsState.current)
					.map((it) => new MaxchenRound(it.index, [], it.scores)),
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
		this.rounds.push(new MaxchenRound(this.rounds.length, this.playerNames));
	}

	looseRound(playerName: string) {
		this.roundsState.current[this.roundsState.current.length - 1].loose(playerName);
		this.roundsState.current = [...this.roundsState.current];
		if (this.currentRound.scores.some((score) => score.value >= 5)) this.newRound();
	}

	reset() {
		this.roundsState.current = [];
		this.newRound();
	}

	private handlePlayerChange() {
		let playersHasChanged = false;
		this.roundsState.current.forEach((round) => {
			round.scores = round.scores.filter((score) => this.playerNames.includes(score.playerName));
			playersHasChanged = this.playerNames.some(
				(activePlayer) => !round.scores.map((score) => score.playerName).includes(activePlayer)
			);
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
