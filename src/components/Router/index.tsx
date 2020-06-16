import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import GameStart from '../../scenes/GameStart';

const Router = () => {
  return (
    <Switch>
      <Route path='/' render={(props: any) => <GameStart />} />
    </Switch>
  );
};

export default Router;
