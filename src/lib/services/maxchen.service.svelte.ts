import { MaxchenRound } from '$lib/models/maxchen';
import { MaxchenRepository } from '$lib/persitence/maxchen';
import { Context, StateHistory } from 'runed';
import { PlayersService } from './player.service.svelte';

export class MaxchenService {
	private readonly playersService: PlayersService;
	private readonly maxchenRepository: MaxchenRepository;
	readonly history: StateHistory<MaxchenRound[]>;

	constructor(playersService: PlayersService) {
		this.playersService = playersService;
		this.maxchenRepository = new MaxchenRepository();

		if (this.rounds.isEmpty() || this.roundIsOver) {
			this.addRound();
		}
		this.handlePlayerChange();

		this.history = new StateHistory<MaxchenRound[]>(
			() =>
				$state.snapshot(this.rounds).map((it) => {
					const round = new MaxchenRound([]);
					round.scores = it.scores;
					return round;
				}),
			(c) => this.maxchenRepository.saveAll(c)
		);

		$effect(() => {
			this.rounds.map((round) => {
				// filter out removed players
				round.scores = new Map(
					round.scores.entries().filter(([playerName]) => this.playerNames.includes(playerName))
				);

				// sort scores by players and setup new players
				round.scores = new Map(this.playerNames.map((name) => [name, round.scores.get(name) || 0]));

				return round;
			});
		});
	}

	get rounds() {
		return this.maxchenRepository.getAll();
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
		this.maxchenRepository.saveAll(this.rounds);
		if (this.roundIsOver) this.addRound();
	}

	reset() {
		this.maxchenRepository.deleteAll();
		this.addRound();
	}

	private addRound() {
		this.maxchenRepository.save(new MaxchenRound(this.playerNames));
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
