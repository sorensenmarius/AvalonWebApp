import http from './httpService'
import { Game } from '../models/Game/game';

class GameService {
    public async createGame(): Promise<Game> {
        let response = await http.post('api/services/app/Game/Create');
        return response.data.result;
    }

    public async get(gameId: string): Promise<Game> {
        let response = await http.get('api/services/app/Game/Get', { params: {id: gameId} })
        return response.data.result;
    }

    public async startGame(gameId: string, rollene: string[]): Promise<Game> {
        let response = await http.post('api/services/app/Game/StartGame', { 
            id: gameId,
            roles: rollene
        })
        return response.data.result;
    } 

    public async createNewRound(): Promise<Game> {
        let response = await http.post('api/services/app/Game/CreateNewRound');
        return response.data.result;
    }
    
    public async assassinate(gameId: string, playerId: string): Promise<Game> {
        let response = await http.post('api/services/app/Game/Assassinate', {
            GameId: gameId, 
            PlayerId: playerId
        });
        return response.data.result;
    }
    public async gameEnd(gameId: string): Promise<Game> {
        let response = await http.post('api/services/app/Game/GameEnd', { params: {id: gameId} });
        return response.data.result;
    }
    public async getHowManyEvil(n: number): Promise<number> {
        let response = await http.get('api/services/app/Game/GetHowManyEvils', { params: {howManyPlayers: n} })
        return response.data.result;
    }
    public async nextRound(gameId: string): Promise<void> {
        await http.post('api/services/app/Game/NextRound', {
            GameId: gameId
        })
    }
    public async removePlayer(gameId: string, playerId: string): Promise<void> {
        await http.delete('api/services/app/Game/RemovePlayer', { 
            params: {
                gameId: gameId,
                playerId: playerId
            }
        })
    }
}

export default new GameService()