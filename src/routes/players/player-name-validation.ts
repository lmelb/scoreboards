import { PlayersService } from '$lib/services/player.service.svelte';
import { z } from 'zod';

export function validatePlayerName(
	playerName: string,
	playersState: PlayersService
): z.SafeParseReturnType<string, string> {
	return z
		.string()
		.min(2, 'Must be 2 or more characters long')
		.max(10, 'Must be 10 or less characters long')
		.trim()
		.refine((val) => !playersState.nameExsits(val), `Player already exsits`)
		.safeParse(playerName);
}
