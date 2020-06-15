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
}

export default new GameService()