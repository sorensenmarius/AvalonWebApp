import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import GameStart from '../../scenes/GameStart';
import JoinGame from '../../scenes/JoinGame';
import PlayGame from '../../scenes/PlayGame';
import Home from '../../scenes/Home';

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
