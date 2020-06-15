import { observable, action } from 'mobx';
import { Player, EmptyPlayer } from '../models/Players/player';
import playerService from '../services/playerService';

export default class PlayerStore {
    @observable currentPlayer: Player = new EmptyPlayer();

    @action
    async createPlayer(name: string, joinCode: string) {
        let response = await playerService.createPlayer(name, joinCode)
        this.currentPlayer = response.player;
        return response.game;
    }
}