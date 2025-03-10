import { MaxchenRound } from '$lib/models/Maxchen';
import { Repository } from './repository';

export class MaxchenRepository extends Repository<MaxchenRound> {
	constructor() {
		super('maxchen', {
			serializer: {
				serialize: (value) =>
					JSON.stringify(value.map((round) => Array.from(round.scores.entries()))),
				deserialize: (data) =>
					JSON.parse(data).map((round: [string, number][]) => {
						const maxchenRound = new MaxchenRound([]);
						maxchenRound.scores = new Map<string, number>(round);
						return maxchenRound;
					})
			}
		});
	}
}
