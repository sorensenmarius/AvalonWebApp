import React, { useEffect, useState } from 'react'
import WaitingForPlayers from './components/WaitingForPlayers'
import { HubConnectionBuilder } from '@aspnet/signalr';
import { inject, observer } from 'mobx-react';
import Stores from '../../../stores/storeIdentifier';
import AppConsts from '../../../lib/appconst';
import GameStatus from '../../../models/Game/gameStatus';
import RoundStatus from '../../../models/Round/roundStatus';
import SelectingTeam from './components/SelectingTeam';
import { Game } from '../../../models/Game/game';
import VotingForTeam from './components/VotingForTeam';
import Loader from './components/Loader';
import ExpeditionVote from './components/ExpeditionVote';
import AssassinTurn from './components/AssassinTurn';
import GameEnded from './components/GameEnded';
import GameStore from '../../../stores/gameStore';
import PlayerStore from '../../../stores/playerStore';
import { Player } from '../../../models/Players/player';

interface PlayGameProps {
    gameStore?: GameStore
    playerStore?: PlayerStore
}

const PlayGame = (props: PlayGameProps) => {
    const { gameStore, playerStore } = props
    const [game, setGame] = useState<Game>(gameStore!.currentGame)
    
    useEffect(() => {
        (async () => {
            await initSocket();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setGame(gameStore!.currentGame)
        playerStore!.currentPlayer = game.players.find((p: Player) => p.id === playerStore!.currentPlayer.id)!
    }, [gameStore?.currentGame])

    const initSocket = async () => {
        const connect = new HubConnectionBuilder()
            .withUrl(AppConsts.remoteServiceBaseUrl + '/gameHub')
            .build()

        try {
            await connect.start()
            await connect.invoke("JoinAllGroup", game.id)
        } catch(err) {
            console.log(err)
        }
        connect.on("UpdateAll", function() {
            gameStore!.get(game.id);
        })
    }


    return(
        (() => {
            if(game.status === GameStatus.WaitingForPlayers) return <WaitingForPlayers game={game}/>
            if(game.status === GameStatus.Playing) {
                switch(game.currentRound.status) {
                    case RoundStatus.SelectingTeam: return <SelectingTeam me={playerStore!.currentPlayer} game={game} />
                    case RoundStatus.VotingForTeam: return <VotingForTeam me={playerStore!.currentPlayer} game={game} />
                    case RoundStatus.TeamApproved: return <Loader />;
                    case RoundStatus.TeamDenied: return <Loader />;
                    case RoundStatus.VotingExpedition: return <ExpeditionVote me={playerStore!.currentPlayer} game={game} />
                    case RoundStatus.MissionSuccess: return <Loader />;
                    case RoundStatus.MissionFailed: return <Loader />;
                }
            }
            if(game.status === GameStatus.AssassinTurn) return <AssassinTurn me={playerStore!.currentPlayer} game={game} />
            if(game.status === GameStatus.Ended) return <GameEnded />
            return null;
        })()
    )
}

export default inject(Stores.GameStore)(inject(Stores.PlayerStore)(observer(PlayGame)));
