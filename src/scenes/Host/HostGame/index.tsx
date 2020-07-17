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
import HostExpeditionResult from './components/HostExpeditionResult';

const HostGame = (props: any) => {
    const [game, setGame] = useState<Game>(props.gameStore.currentGame);

    useEffect(() => {
        console.log(props.gameStore.currentGame)
        setGame(props.gameStore.currentGame);
        console.log(game)
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
            await connect.invoke("JoinAllGroup", props.gameStore.currentGame.id)
            await connect.invoke("JoinHostGroup", props.gameStore.currentGame.id)
        } catch(err) {
            console.log(err)
        }
        connect.on("UpdateAll", function() {
            props.gameStore.get(props.gameStore.currentGame.id);
        })
        connect.on("UpdateHost", function () {
            props.gameStore.get(props.gameStore.currentGame.id);
        })
    }


    return(
        (() => {
            if(game.status === GameStatus.WaitingForPlayers) return <GameStart game={game}/>
            if(game.status === GameStatus.Playing) {
                switch(game.currentRound.status) {
                    case RoundStatus.SelectingTeam: return <HostSelectingTeam game={game} />
                    case RoundStatus.VotingForTeam: return <HostVoting expedition={false} game={game} key="teamVote" />
                    case RoundStatus.TeamApproved: return <HostTeamVoteResult accepted={true} game={game} key="teamVoteSuccessful"/>;
                    case RoundStatus.TeamDenied: return <HostTeamVoteResult accepted={false} game={game} key="teamVoteFailed"/>;
                    case RoundStatus.VotingExpedition: return <HostVoting expedition={true} game={game} key="expeditionVote" />
                    case RoundStatus.MissionSuccess: return <HostExpeditionResult accepted={true} game={game} key="expeditionSuccessful" />;
                    case RoundStatus.MissionFailed: return <HostExpeditionResult accepted={false} game={game} key="expeditionFailed"/>;
                }
            }
            return null;
        })()
    )
}

export default inject(Stores.GameStore)(inject(Stores.PlayerStore)(observer(HostGame)));
