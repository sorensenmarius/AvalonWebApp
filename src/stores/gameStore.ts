import { observable, action } from 'mobx';
import { Game, EmptyGame } from '../models/Game/game';
import gameService from '../services/game/gameService';


export default class GameStore {
    @observable currentGame: Game = new EmptyGame();

    @action
    async createGame() {
        let response = await gameService.createGame();
        this.currentGame = response;
    }

    @action
    async get(gameId: string) {
        let response = await gameService.get(gameId);
        this.currentGame = response;
    }
}