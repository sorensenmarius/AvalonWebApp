
import GameStore from './gameStore';
import SessionStore from './sessionStore';
import PlayerStore from './playerStore';
import RoundStore from './roundStore';

export default function initializeStores() {
  return {
    gameStore: new GameStore(),
    sessionStore: new SessionStore(),
    playerStore: new PlayerStore(),
    roundStore: new RoundStore()
  };
}
