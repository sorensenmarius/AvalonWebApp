import { observable, action } from 'mobx';
import { Round, EmptyRound } from '../models/Round/round';
import roundService from '../services/roundService';
import RoundStatus from '../models/Round/roundStatus';


export default class RoundStore {
    @observable currentRound: Round = new EmptyRound();

    @action
    async setTeam(GameId: string, CurrentTeam: string[]): Promise<void> {
        await roundService.setTeam(GameId, CurrentTeam);
    }

    @action
    async voteForTeam(PlayerId: string, GameId: string, Vote: Boolean): Promise<Round> {
        let response = await roundService.voteForTeam(PlayerId, GameId, Vote);
        this.currentRound = response;
        return response
    }

    @action
    async expeditonVote(PlayerId: string, GameId: string, Vote: Boolean): Promise<Round> {
        let response = await roundService.expeditonVote(PlayerId, GameId, Vote);
        this.currentRound = response;
        return response
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

    @action
    async submitTeam(GameId: string) {
        await roundService.submitTeam(GameId);
    }

    @action
    async setRoundStatus(GameId: string, Status: RoundStatus) {
        await roundService.setRoundStatus(GameId, Status)
    }
}