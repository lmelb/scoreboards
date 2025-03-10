import { Player } from '$lib/models/Player';
import { Repository } from './repository';

export class PlayerRepository extends Repository<Player> {
	constructor() {
		super('player', {
			serializer: {
				serialize: (value: Player[]) => JSON.stringify(value),
				deserialize: (data) => JSON.parse(data).map((d: Player) => new Player(d.name))
			}
		});
	}
}
