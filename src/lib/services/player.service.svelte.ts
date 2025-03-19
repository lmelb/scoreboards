import { PlayerRepository } from '$lib/persitence/player';
import { Context } from 'runed';
import { Player, PlayerError } from '../models/player';
import { check } from '../utils';

export class PlayersService {
	private readonly playersRepository: PlayerRepository;

	constructor() {
		this.playersRepository = new PlayerRepository();
	}

	get players() {
		return this.playersRepository.getAll();
	}

	add(player: Player) {
		check(
			!this.playersRepository.exists(player),
			`Player ${player.name} already exists.`,
			PlayerError
		);

		this.playersRepository.save(player);
	}

	remove(player: Player) {
		check(
			this.playersRepository.exists(player),
			`Player ${player.name} does not exists.`,
			PlayerError
		);

		this.playersRepository.delete(player);
	}

	nameExsits(playerName: string): boolean {
		return this.players.some((it) => it.name.toLowerCase() === playerName.toLowerCase());
	}

	sort(from: number, to: number) {
		const players = [...this.players];
		const [movedPlayer] = players.splice(from, 1);
		players.splice(to, 0, movedPlayer);
		this.playersRepository.saveAll(players);
	}
}

const playersContext = new Context<PlayersService>('players');

export function setPlayersService(): PlayersService {
	return playersContext.set(new PlayersService());
}

export function getPlayersService(): PlayersService {
	return playersContext.get();
}
