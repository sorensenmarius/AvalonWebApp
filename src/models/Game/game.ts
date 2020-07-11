import GameStatus from './gameStatus';
import { Player, EmptyPlayer } from '../Players/player';
import { Round, EmptyRound } from '../Round/round';

export interface Game {
    id: string;
    joinCode: string;
    players: Player[];
    status: GameStatus;
    creationTime: Date;
    currentRound: Round;
    currentPlayer: Player;
}

export class EmptyGame implements Game {
    id: string;
    joinCode: string;
    players: Player[];
    status: GameStatus;
    creationTime: Date;
    currentRound: Round;
    currentPlayer: Player;

    constructor() {
        this.id = '';
        this.joinCode = '';
        this.players = [];
        this.status = GameStatus.WaitingForPlayers;
        this.creationTime = new Date();
        this.currentRound = new EmptyRound();
        this.currentPlayer = new EmptyPlayer();
    }
}