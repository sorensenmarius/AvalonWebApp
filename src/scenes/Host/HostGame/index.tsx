import React, { useEffect, useState } from 'react'
import { HubConnectionBuilder } from '@aspnet/signalr';
import { inject, observer } from 'mobx-react';
import Stores from '../../../stores/storeIdentifier';
import AppConsts from '../../../lib/appconst';
import GameStatus from '../../../models/Game/gameStatus';
import RoundStatus from '../../../models/Round/roundStatus';
import GameStart from '../GameStart';
import { Game } from '../../../models/Game/game';
import HostSelectingTeam from './components/HostSelectingTeam';
import HostVoting from './components/HostVoting';
import HostTeamVoteResult from './components/HostTeamVoteResult';

const HostGame = (props: any) => {
    const [game, setGame] = useState<Game>(props.gameStore.currentGame);

    useEffect(() => {
        setGame(props.gameStore.currentGame);
    }, [props.gameStore.currentGame])
    
    useEffect(() => {
        (async () => {
            await createGame();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const createGame = async () => {
        await props.gameStore.createGame()
        await initSocket()
    }

    const initSocket = async () => {
        const connect = new HubConnectionBuilder()
            .withUrl(AppConsts.remoteServiceBaseUrl + '/gameHub')
            .build()

        try {
            await connect.start()
            connect.invoke("JoinGameGroup", props.gameStore.currentGame.id)
        } catch(err) {
            console.log(err)
        }
        connect.on("GameUpdated", function() {
            props.gameStore.get(props.gameStore.currentGame.id);
        })
    }


    return(
        (() => {
            if(game.status === GameStatus.WaitingForPlayers) return <GameStart game={game}/>
            if(game.status === GameStatus.Playing) {
                switch(game.currentRound.status) {
                    case RoundStatus.SelectingTeam: return <HostSelectingTeam game={game} />
                    case RoundStatus.VotingForTeam: return <HostVoting expedition={false} game={game} />
                    case RoundStatus.TeamApproved: return <HostTeamVoteResult accepted={true} game={game}/>;
                    case RoundStatus.TeamDenied: return <HostTeamVoteResult accepted={false} game={game}/>;
                }
            }
            return null;
        })()
    )
}

export default inject(Stores.GameStore)(inject(Stores.PlayerStore)(observer(HostGame)));
