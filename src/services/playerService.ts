import http from './httpService'
import { GamePlayerDto } from './dto/gamePlayerDto';

class PlayerService {
    public async createPlayer(name: string, joinCode: string): Promise<GamePlayerDto> {
        let response = await http.post('api/services/app/Player/Create', {
            joinCode: joinCode,
            name: name
        });
        return response.data.result;
    }
}

export default new PlayerService()