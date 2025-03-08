import { MaxchenRound } from '$lib/models/Maxchen';
import type { Player } from '$lib/models/Player';
import { check } from '$lib/utils';
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

	get hasStarted() {
		return this.rounds.length > 0;
	}

	private get currentRound() {
		return this.rounds[this.rounds.length - 1];
	}

	start() {
		check(!this.hasStarted, 'Game has already started');
		this.addRound();
	}

	looseRound(playerName: string) {
		if ([...this.currentRound.scores.values()].some((score) => score >= 5)) {
			this.addRound();
		}
		this.currentRound.loose(playerName);
		// needed to change the state
		this.roundsState.current = [...this.roundsState.current];
	}

	reset() {
		this.roundsState.current = [];
		this.addRound();
	}

	private addRound() {
		this.rounds.push(new MaxchenRound(this.playerNames));
	}

	private handlePlayerChange() {
		let playersHasChanged = false;
		this.roundsState.current.forEach((round) => {
			round.scores = new Map(
				round.scores.entries().filter(([playerName]) => this.playerNames.includes(playerName))
			);
			playersHasChanged = this.playerNames.some((name) => !round.scores.has(name));
		});

		if (playersHasChanged) this.addRound();
	}
}

const context = new Context<MaxchenService>('maxchen');

export function setMaxchenService(players: Player[]): MaxchenService {
	return context.set(new MaxchenService(players.map((it) => it.name)));
}

export function getMaxchenService(): MaxchenService {
	return context.get();
}
