import { Game } from '../../models/Game/game';
import { Player } from '../../models/Players/player';

export interface GamePlayerDto {
    game: Game;
    player: Player;
}