import http from '../httpService'
import { Game } from '../../models/Game/game';

class GameService {
    public async createGame(): Promise<Game> {
        let response = await http.post('api/services/app/Game/Create');
        return response.data.result;
    }
}

export default new GameService()