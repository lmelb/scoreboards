import { Context, PersistedState, StateHistory, watch } from 'runed';
import { PlayersService } from './player.service.svelte';
import { DoppelkopfRepository } from '$lib/persitence/doppelkopf';
import type { DoppelkopfRound } from '$lib/models/doppelkopf';
import { check } from '$lib/utils';
import { RoundError } from '$lib/models/round';

export class DoppelkopfService {
	private readonly playersService: PlayersService;
	private readonly repository: DoppelkopfRepository;
	readonly history: StateHistory<DoppelkopfRound[]>;
	withNegativePoints = new PersistedState('DoppelkopfWithNegativePoints', true);

	constructor(playersService: PlayersService) {
		this.playersService = playersService;
		this.repository = new DoppelkopfRepository();

		this.history = new StateHistory<DoppelkopfRound[]>(
			() => this.repository.getAll(),
			(c) => this.repository.replace(c)
		);

		watch(
			() => this.playerNames,
			(playerNames) => this.handlePlayerChange(playerNames)
		);
	}

	get rounds() {
		return this.repository.getAll();
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

	score(winners: string[], losers: string[], score: number) {
		check(
			(winners.length === 2 && losers.length === 2) ||
				(winners.length === 1 && losers.length === 3),
			'Expexted two winners and losers or one winner and three loseres for solo',
			RoundError
		);

		check(
			winners.every((winner) => !losers.includes(winner)),
			'A Winners can not also be a losers',
			RoundError
		);

		const isSolo = winners.length === 1;

		const newRound: DoppelkopfRound = {
			playerScores:
				this.repository.getLast()?.playerScores ??
				this.playerNames.map((name) => ({ playerName: name, score: 0 })),
			score,
			isSolo
		};

		newRound.playerScores = newRound.playerScores.map(({ playerName, score: oldScore }) => ({
			playerName,
			score: winners.includes(playerName)
				? oldScore + score * (isSolo ? 3 : 1)
				: losers.includes(playerName) && this.withNegativePoints.current
					? oldScore - score
					: oldScore
		}));

		this.repository.save(newRound);
	}

	reset() {
		this.repository.deleteAll();
	}

	private handlePlayerChange(playerNames: string[]) {
		this.repository.replace(
			this.repository.getAll().map((round) => {
				// filter out removed players
				round.playerScores = round.playerScores.filter(({ playerName }) =>
					playerNames.includes(playerName)
				);

				// sort scores by players and setup new players
				round.playerScores = playerNames.map(
					(playerName) =>
						round.playerScores.find((it) => it.playerName === playerName) ?? {
							playerName: playerName,
							score: 0
						}
				);
				return round;
			})
		);
	}
}

const context = new Context<DoppelkopfService>('doppelkopf');

export function setDoppelkopfService(playersService: PlayersService): DoppelkopfService {
	return context.set(new DoppelkopfService(playersService));
}

export function getDoppelkopfService(): DoppelkopfService {
	return context.get();
}
