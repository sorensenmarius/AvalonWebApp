import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../../scenes/Home';
import JoinGame from '../../scenes/Client/JoinGame';
import GameStart from '../../scenes/Host/GameStart';
import PlayGame from '../../scenes/Client/PlayGame';

const Router = () => {
  return (
    <Switch>
      <Route path='/joinGame' render={(props: any) => <JoinGame />} />
      <Route path='/createGame' render={(props: any) => <GameStart />} />
      <Route path='/playGame' render={(props: any) => <PlayGame />} />
      
      
      {/* Should always be last to not override other routes */}
      <Route path='/' render={(props: any) => <Home />} />
    </Switch>
  );
};

export default Router;
