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
    pointsEvil: number;
    pointsInnocent: number;
    counter: number; 
    previousRounds: Round[];
}

export class EmptyGame implements Game {
    id: string;
    joinCode: string;
    players: Player[];
    status: GameStatus;
    creationTime: Date;
    currentRound: Round;
    currentPlayer: Player;
    pointsEvil: number;
    pointsInnocent: number;
    counter: number;
    previousRounds: Round[];

    constructor() {
        this.id = '';
        this.joinCode = '';
        this.players = [];
        this.status = GameStatus.WaitingForPlayers;
        this.creationTime = new Date();
        this.currentRound = new EmptyRound();
        this.currentPlayer = new EmptyPlayer();
        this.pointsEvil = 0;
        this.pointsInnocent = 0;
        this.counter = 0;
        this.previousRounds = [];
    }
}