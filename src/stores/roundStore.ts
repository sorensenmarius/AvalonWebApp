import { observable, action } from 'mobx';
import { Round, EmptyRound } from '../models/Round/round';
import roundService from '../services/roundService';


export default class RoundStore {
    @observable currentRound: Round = new EmptyRound();

    @action
    async addPlayerToTeam(PlayerId: string, GameId: string) {
        let response = await roundService.addPlayerToTeam(PlayerId, GameId);
        this.currentRound = response;
    }

    @action
    async removePlayerFromTeam(PlayerId: string, GameId: string) {
        await roundService.removePlayerFromTeam(PlayerId, GameId);
    }

    @action
    async voteForTeam(PlayerId: string, GameId: string, Vote: boolean) {
        let response = await roundService.voteForTeam(PlayerId, GameId, Vote);
        this.currentRound = response;
    }

    @action
    async expeditonVote(PlayerId: string, GameId: string, Vote: boolean) {
        let response = await roundService.expeditonVote(PlayerId, GameId, Vote);
        this.currentRound = response;
    }

    @action
    async voteForTeamResults(GameId: string) {
        let response = await roundService.voteForTeamResults(GameId);
        this.currentRound = response;
    }

    @action
    async expeditionResults(GameId: string) {
        let response = await roundService.expeditionResults(GameId);
        this.currentRound = response;
    }
}