import http from './httpService'
import { Round } from '../models/Round/round';

class RoundService {
    public async addPlayerToTeam(PlayerId: string, GameId: string): Promise<Round> {
        let response = await http.post('api/services/app/Round/AddPlayerToTeam', {
            PlayerId: PlayerId,
            GameId: GameId
        });
        return response.data.result;
    }

    public async removePlayerFromTeam(PlayerId: string, GameId: string){
        await http.delete('api/services/app/Round/RemovePlayerFromTeam', {params: {PlayerId: PlayerId, GameId: GameId}});
    }

    public async voteForTeam(PlayerId: string, GameId: string, Vote: Boolean): Promise<Round> {
        let response = await http.post('api/services/app/Round/VoteForTeam', {
            PlayerId: PlayerId,
            GameId: GameId,
            Vote: Vote
        });
        return response.data.result;
    }

    public async expeditonVote(PlayerId: string, GameId: string, Vote: Boolean): Promise<Round> {
        let response = await http.post('api/services/app/Round/ExpeditonVote', {
            PlayerId: PlayerId,     
            GameId: GameId,
            Vote: Vote
        });
        return response.data.result;
    }

    public async voteForTeamResults(GameId: string): Promise<Round> {
        let response = await http.post('api/services/app/Round/VoteForTeamResults', {
            GameId: GameId
        });
        return response.data.result;
    }

    public async expeditionResults(GameId: string): Promise<Round> {
        let response = await http.post('api/services/app/Round/expeditionResults', {
            GameId: GameId
        });
        return response.data.result;
    }

    public async submitTeam(GameId: string): Promise<void> {
        await http.post('api/services/app/Round/submitTeam', {
            GameId: GameId
        })
    }
}

export default new RoundService()