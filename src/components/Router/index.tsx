import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../../scenes/Home';
import HostGame from '../../scenes/Host/HostGame';
import JoinGame from '../../scenes/Client/JoinGame';
import PlayGame from '../../scenes/Client/PlayGame'; 
import HostGameEnded from '../../scenes/Host/HostGame/components/HostGameEnded';

const Router = () => {
  return (
    <Switch>
      <Route path='/test' render={(props: any) => <HostGameEnded 
        game={{
          "id": "c722e5f6-eeee-4903-05f4-08d83064811a",
          "creationTime": new Date(),
          "joinCode": "818068",
          "players": [
            {
              "name": "sdfsfd",
              "roleId": 2,
              "roleInfo": "The Evil players are: sdfsdfsdf   Marius   ",
              "roleName": "Merlin",
              "isEvil": false,
              "order": 0,
              "id": "7b4cf115-598d-4953-eeeb-08d830649386"
            },
            {
              "name": "sdfsdfsdf",
              "roleId": 5,
              "roleInfo": "Percival sees you as Merlin.|The evil players are: sdfsdfsdf & Marius",
              "roleName": "Morgana",
              "isEvil": true,
              "order": 1,
              "id": "501ac874-2bec-4e67-eeec-08d830649386"
            },
            {
              "name": "Marius",
              "roleId": 7,
              "roleInfo": "If you figure out who Merlin is you win!|The evil players are: sdfsdfsdf & Marius",
              "roleName": "Assassin",
              "isEvil": true,
              "order": 2,
              "id": "086ed905-0007-48f5-eeed-08d830649386"
            },
            {
              "name": "Marthe",
              "roleId": 1,
              "roleInfo": "You win if you can complete 3 Missions.",
              "roleName": "Servant",
              "isEvil": false,
              "order": 3,
              "id": "969b7484-4c9a-47e2-eeee-08d830649386"
            },
            {
              "name": "Johanna",
              "roleId": 3,
              "roleInfo": "Merlin is: sdfsfd or sdfsdfsdf",
              "roleName": "Percival",
              "isEvil": false,
              "order": 4,
              "id": "b427c0cd-23d6-4b36-eeef-08d830649386"
            }
          ],
          "status": -1,
          "currentRound": {
            "failedTeams": 0,
            "currentTeam": [
              {
                "name": "Marthe",
                "roleId": 1,
                "roleInfo": "You win if you can complete 3 Missions.",
                "roleName": "Servant",
                "isEvil": false,
                "order": 3,
                "id": "969b7484-4c9a-47e2-eeee-08d830649386"
              },
              {
                "name": "sdfsdfsdf",
                "roleId": 5,
                "roleInfo": "Percival sees you as Merlin.|The evil players are: sdfsdfsdf & Marius",
                "roleName": "Morgana",
                "isEvil": true,
                "order": 1,
                "id": "501ac874-2bec-4e67-eeec-08d830649386"
              },
              {
                "name": "Marius",
                "roleId": 7,
                "roleInfo": "If you figure out who Merlin is you win!|The evil players are: sdfsdfsdf & Marius",
                "roleName": "Assassin",
                "isEvil": true,
                "order": 2,
                "id": "086ed905-0007-48f5-eeed-08d830649386"
              }
            ],
            "status": 5,
            "votesForTeam": 5,
            "votesAgainstTeam": 0,
            "missionVoteGood": 3,
            "missionVoteBad": 0,
            "requiredPlayers": 3,
          },
          "currentPlayer": {
            "name": "Marthe",
            "roleId": 1,
            "roleInfo": "You win if you can complete 3 Missions.",
            "roleName": "Servant",
            "isEvil": false,
            "order": 3,
            "id": "969b7484-4c9a-47e2-eeee-08d830649386"
          },
          "pointsInnocent": 3,
          "pointsEvil": 2,
          "counter": 3,
          "previousRounds": [
            {
              "failedTeams": 0,
              "currentTeam": [
                {
                  "name": "Johanna",
                  "roleId": 3,
                  "roleInfo": "Merlin is: sdfsfd or sdfsdfsdf",
                  "roleName": "Percival",
                  "isEvil": false,
                  "order": 4,
                  "id": "b427c0cd-23d6-4b36-eeef-08d830649386"
                }
              ],
              "status": 5,
              "votesForTeam": 5,
              "votesAgainstTeam": 0,
              "missionVoteGood": 2,
              "missionVoteBad": 0,
              "requiredPlayers": 2,
            },
            {
              "failedTeams": 0,
              "currentTeam": [],
              "status": 5,
              "votesForTeam": 5,
              "votesAgainstTeam": 0,
              "missionVoteGood": 2,
              "missionVoteBad": 0,
              "requiredPlayers": 2,
            }
          ]
        }} 
      />} />
      <Route path='/host' render={(props: any) => <HostGame />} />
      <Route path='/play' render={(props: any) => <JoinGame />} />
      <Route path='/playGame' render={(props: any) => <PlayGame />} />
      
      
      {/* Should always be last to not override other routes */}
      <Route path='/' render={(props: any) => <Home />} />
    </Switch>
  );
};

export default Router;
