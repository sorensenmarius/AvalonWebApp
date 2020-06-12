
import GameStore from './gameStore';
import SessionStore from './sessionStore';

export default function initializeStores() {
  return {
    gameStore: new GameStore(),
    sessionStore: new SessionStore()
  };
}
