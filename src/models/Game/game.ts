import GameStatus from './gameStatus';
import { Player } from '../Players/player';
import { Round, EmptyRound } from '../Round/round';

export interface Game {
    id: string;
    joinCode: string;
    players: Player[];
    gameStatus: GameStatus;
    creationTime: Date;
    currentRound: Round;
}

export class EmptyGame implements Game {
    id: string;
    joinCode: string;
    players: Player[];
    gameStatus: GameStatus;
    creationTime: Date;
    currentRound: Round;

    constructor() {
        this.id = '';
        this.joinCode = '';
        this.players = [];
        this.gameStatus = GameStatus.WaitingForPlayers;
        this.creationTime = new Date();
        this.currentRound = new EmptyRound();
    }
}