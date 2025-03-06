import { Context, PersistedState, StateHistory } from 'runed';
import { Player, PlayerError } from './models/Player';
import { check } from './utils';
import { json } from '@sveltejs/kit';

export class PlayersState {
	private readonly playersState = new PersistedState<Player[]>('players', [], {
		serializer: Player.serializer()
	});

	get players() {
		return this.playersState.current;
	}

	add(player: Player) {
		check(!this.exsits(player), `Player ${player.name} already exists.`, PlayerError);

		this.playersState.current = [...this.playersState.current, player];
	}

	remove(player: Player) {
		check(this.exsits(player), `Player ${player.name} does not exists.`, PlayerError);

		this.playersState.current = this.players.filter((it) => !it.equals(player));
	}

	exsits(player: Player): boolean {
		return this.players.some((it) => it.equals(player));
	}

	nameExsits(playerName: string): boolean {
		return this.players.some((it) => it.name.toLowerCase() === playerName.toLowerCase());
	}
}

const playersContext = new Context<PlayersState>('players');

export function setPlayersState(): PlayersState {
	return playersContext.set(new PlayersState());
}

export function getPlayersState(): PlayersState {
	return playersContext.get();
}
