import { MaxchenRound } from '$lib/models/Maxchen';
import type { Player } from '$lib/models/Player';
import { check } from '$lib/utils';
import { Context, PersistedState, StateHistory } from 'runed';
import { PlayersService } from './player.service.svelte';

export class MaxchenService {
	private readonly playersService: PlayersService;
	private readonly roundsState = new PersistedState<MaxchenRound[]>('maxchen', [], {
		serializer: MaxchenRound.serializer()
	});

	readonly history: StateHistory<MaxchenRound[]>;

	constructor(playersService: PlayersService) {
		this.playersService = playersService;
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

		this.addRound();

		$effect(() => {
			if (this.roundIsOver) this.addRound();

			this.roundsState.current.forEach((round) => {
				// filter out removed players
				round.scores = new Map(
					round.scores.entries().filter(([playerName]) => this.playerNames.includes(playerName))
				);

				// sort scores by players and setup new players
				round.scores = new Map(this.playerNames.map((name) => [name, round.scores.get(name) || 0]));
			});
		});
	}

	get rounds() {
		return this.roundsState.current;
	}

	get hasStarted() {
		return this.rounds.length > 0;
	}

	get playerNames() {
		return this.playersService.players.map((it) => it.name);
	}

	get hasPlayers() {
		return this.playerNames.length > 0;
	}

	private get currentRound() {
		return this.rounds[this.rounds.length - 1];
	}
	private get roundIsOver() {
		return [...this.currentRound.scores.values()].some((score) => score >= 5);
	}

	looseRound(playerName: string) {
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

	private handlePlayerChange() {}
}

const context = new Context<MaxchenService>('maxchen');

export function setMaxchenService(playersService: PlayersService): MaxchenService {
	return context.set(new MaxchenService(playersService));
}

export function getMaxchenService(): MaxchenService {
	return context.get();
}
