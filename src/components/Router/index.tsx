import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../../scenes/Home';
import HostGame from '../../scenes/Host/HostGame';
import JoinGame from '../../scenes/Client/JoinGame';
import PlayGame from '../../scenes/Client/PlayGame';

const Router = () => {
  return (
    <Switch>
      <Route path='/host' render={(props: any) => <HostGame />} />
      <Route path='/play' render={(props: any) => <JoinGame />} />
      <Route path='/playGame' render={(props: any) => <PlayGame />} />
      
      
      {/* Should always be last to not override other routes */}
      <Route path='/' render={(props: any) => <Home />} />
    </Switch>
  );
};

export default Router;
