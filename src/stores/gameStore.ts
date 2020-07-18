import { observable, action } from 'mobx';
import { Game, EmptyGame } from '../models/Game/game';
import gameService from '../services/gameService';


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
        response.players.sort((a, b) => {
            return a.order - b.order
        })
        this.currentGame = response;
    }

    @action
    async createNewRound(){
        let response = await gameService.createNewRound();
        this.currentGame = response;
    }

    @action
    async startGame(gameId: string, rollene: string[]){
        let response = await gameService.startGame(gameId , rollene);
        this.currentGame = response;
    }

    @action
    async assassinate(gameId: string, playerId: string){
        let response = await gameService.assassinate(gameId , playerId);
        this.currentGame = response;
    }

    @action
    async gameEnd(gameId: string){
        let response = await gameService.gameEnd(gameId);
        this.currentGame = response;
    }

    @action
    async getHowManyEvil(n: number) {
        return await gameService.getHowManyEvil(n);
    }

    @action
    async nextRound(gameId: string) {
        return await gameService.nextRound(gameId);
    }

    @action
    async removePlayer(gameId: string, playerId: string) {
        return await gameService.removePlayer(gameId, playerId);
    }
}