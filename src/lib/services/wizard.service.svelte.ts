import { Context, StateHistory, watch } from 'runed';
import { WizardRepository } from '$lib/persitence/wizard';
import type { WizardRound } from '$lib/models/wizard';
import { PlayersService } from './player.service.svelte';
import { string } from 'zod';

export class WizardService {
	private readonly repository: WizardRepository;
	readonly history: StateHistory<WizardRound[]>;

	readonly playerNames: string[];

	constructor(playersService: PlayersService) {
		this.playerNames = playersService.players.map((p) => p.name);
		this.repository = new WizardRepository();
		this.history = new StateHistory<WizardRound[]>(
			() => this.repository.getAll(),
			(c) => this.repository.replace(c)
		);
	}

	get rounds() {
		return this.repository.getAll();
	}

	get possibleTricks() {
		return this.rounds.length;
	}

	get possibleTricksNextRound() {
		return this.rounds.length + 1;
	}

	get hasPlayers() {
		return this.playerNames.length > 0;
	}

	get hasEstimation() {
		return this.repository.getLast()?.every((it) => it.actualTricks === undefined) ?? false;
	}

	expect(expectedScores: { playerName: string; expectedTricks: number }[]) {
		this.repository.save(expectedScores);
	}

	actual(actualScores: { playerName: string; actualTricks: number }[]) {
		const currentRound: WizardRound = this.repository.getLast().map((it) => {
			const actualTricks =
				actualScores.find((actual) => actual.playerName === it.playerName)?.actualTricks ?? 0;

			return {
				...it,
				actualTricks,
				score:
					actualTricks === it.expectedTricks
						? 20 + actualTricks * 10
						: (actualTricks - it.expectedTricks) * 10
			};
		});
		this.repository.replaceLast(currentRound);
	}

	reset() {
		this.repository.deleteAll();
	}
}

const wizardContext = new Context<WizardService>('wizard');

export function setWizardService(playersService: PlayersService): WizardService {
	return wizardContext.set(new WizardService(playersService));
}

export function getWizardService(): WizardService {
	return wizardContext.get();
}
