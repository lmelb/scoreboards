import type { DoppelkopfRound } from '$lib/models/doppelkopf';
import { PersistedState } from 'runed';

export class DoppelkopfRepository {
	rounds = new PersistedState<DoppelkopfRound[]>('doppelkopf', []);

	getAll() {
		return this.rounds.current;
	}

	getLast() {
		return this.rounds.current[this.rounds.current.length - 1];
	}

	replace(rounds: DoppelkopfRound[]) {
		this.rounds.current = rounds;
	}

	save(round: DoppelkopfRound) {
		this.rounds.current = [...this.rounds.current, round];
	}

	deleteAll() {
		this.rounds.current = [];
	}
}
