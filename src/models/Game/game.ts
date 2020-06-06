import GameStatus from './gameStatus';
import { Player } from '../Players/player';

export interface Game {
    id: string;
    joinCode: string;
    players: Player[];
    gameStatus: GameStatus;
    creationTime: Date;
}

export class EmptyGame implements Game {
    id: string;
    joinCode: string;
    players: Player[];
    gameStatus: GameStatus;
    creationTime: Date;

    constructor() {
        this.id = '';
        this.joinCode = '';
        this.players = [];
        this.gameStatus = GameStatus.WaitingForPlayers;
        this.creationTime = new Date();
    }
}