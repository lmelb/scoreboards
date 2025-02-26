import { Context, PersistedState, StateHistory } from 'runed';
import { Player, PlayerError } from './models/Player';
import { check } from './utils';
import { json } from '@sveltejs/kit';

export class PlayersState {
	private readonly players = new PersistedState<Player[]>('players', [], {
		serializer: Player.serializer()
	});

	getPlayers() {
		return this.players.current;
	}

	addPlayer(player: Player) {
		check(!this.playerExsits(player), `Player "${player.name}" already exists.`, PlayerError);

		this.players.current = [...this.players.current, player];
	}

	removePlayer(player: Player) {
		check(this.playerExsits(player), `Player "${player.name}" does not exists.`, PlayerError);

		this.players.current = this.getPlayers().filter((it) => !it.equals(player));
	}

	private playerExsits(player: Player): boolean {
		return this.getPlayers().some((it) => it.equals(player));
	}
}

const playersContext = new Context<PlayersState>('players');

export function setPlayersState(): PlayersState {
	return playersContext.set(new PlayersState());
}

export function getPlayersState(): PlayersState {
	return playersContext.get();
}
