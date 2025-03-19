export class Player {
	name: string;
	constructor(name: string) {
		if (name.trim() == '') {
			throw new PlayerError('Player name is required.');
		}

		this.name = name;
	}

	equals(other: Player): boolean {
		return other instanceof Player && this.name === other.name;
	}

	static serializer(): PlayerSerializer {
		return {
			serialize: (value: Player[]) => JSON.stringify(value),
			deserialize: (data) => JSON.parse(data).map((d: Player) => new Player(d.name))
		};
	}
}

export type PlayerSerializer = {
	serialize: (value: Player[]) => string;
	deserialize: (value: string) => Player[];
};

export class PlayerError extends Error {
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, PlayerError.prototype);
	}
}
