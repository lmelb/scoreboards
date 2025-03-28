import type { WizardRound } from '$lib/models/wizard';
import { PersistedState } from 'runed';

export class WizardRepository {
	rounds = new PersistedState<WizardRound[]>('wizard', []);

	getAll() {
		return this.rounds.current;
	}

	getLast() {
		return this.rounds.current[this.rounds.current.length - 1];
	}

	replaceLast(round: WizardRound) {
		this.rounds.current.pop();
		this.save(round);
	}

	replace(rounds: WizardRound[]) {
		this.rounds.current = rounds;
	}

	save(round: WizardRound) {
		this.rounds.current = [...this.rounds.current, round];
	}

	deleteAll() {
		this.rounds.current = [];
	}
}
