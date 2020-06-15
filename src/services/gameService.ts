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

    public async startGame(gameId: string, rollene: string[], minions: number): Promise<Game> {
        let response = await http.post('api/services/app/Game/StartGame', { params: 
            {   id: gameId,
                rollene: rollene,
                minions: minions
            } })
        return response.data.result;
    } 

    public async createNewRound(): Promise<Game> {
        let response = await http.post('api/services/app/Game/CreateNewRound');
        return response.data.result;
    }
    
    public async assassinate(gameId: string, playerId: string): Promise<Game> {
        let response = await http.post('api/services/app/Game/Assassinate', { params: {GameId: gameId, PlayerId: playerId} });
        return response.data.result;
    }
    public async gameEnd(gameId: string): Promise<Game> {
        let response = await http.post('api/services/app/Game/GameEnd', { params: {id: gameId} });
        return response.data.result;
    }
}

export default new GameService()