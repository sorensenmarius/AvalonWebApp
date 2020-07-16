import http from './httpService'
import { Round } from '../models/Round/round';

class RoundService {
    public async setTeam(GameId: string, CurrentTeam: string[]): Promise<void> {
        await http.post('api/services/app/Round/SetTeam', {
            GameId,
            CurrentTeam
        })
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