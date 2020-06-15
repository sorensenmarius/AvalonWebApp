import http from './httpService'
import { Game } from '../models/Game/game';

class PlayerService {
    public async createPlayer(name: string, joinCode: string): Promise<Game> {
        let response = await http.post('api/services/app/Player/Create', {
            joinCode: joinCode,
            name: name
        });
        return response.data.result;
    }
}

export default new PlayerService()