import React, { useEffect, useState } from 'react'
import WaitingForPlayers from './components/WaitingForPlayers'
import { HubConnectionBuilder } from '@microsoft/signalr';
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
import { useHistory } from 'react-router-dom';
import RoleModal from './components/RoleModal';
import './index.less'
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

interface PlayGameProps {
    gameStore?: GameStore
    playerStore?: PlayerStore
}

const PlayGame = (props: PlayGameProps) => {
    const { gameStore, playerStore } = props
    const [game, setGame] = useState<Game>(gameStore!.currentGame)
    const [showModal, setShowModal] = useState(false)
    const history = useHistory()
    
    useEffect(() => {
        (async () => {
            await initSocket();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setGame(gameStore!.currentGame)
        let currentPlayer = gameStore!.currentGame.players.find((p: Player) => p.id === playerStore!.currentPlayer.id)!
        if(currentPlayer !== undefined) {
            playerStore!.currentPlayer = currentPlayer
        } else {
            history.push('/play', {
                kicked: true
            })
        }
    }, [gameStore, history, playerStore, gameStore?.currentGame])

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
        connect.on("UpdateAll", () => updateGame(false))
        connect.onreconnected(() => {
            updateGame(false)
        })
    }

    const updateGame = async (manual: boolean) => {
        let oldGame = game;
        let newGame: Game = await gameStore!.get(game.id);
        if(oldGame.status === newGame.status && newGame.status !== GameStatus.WaitingForPlayers && !manual) { // If game status doesn't change retry after two seconds, unless reload is manually started
            setTimeout(async () => {
                await updateGame(manual);
            }, 2000)
        }
    }

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const content = () => {
        switch(game.currentRound.status) {
            case RoundStatus.SelectingTeam: return <SelectingTeam me={playerStore!.currentPlayer} game={game} />
            case RoundStatus.VotingForTeam: return <VotingForTeam me={playerStore!.currentPlayer} game={game} />
            case RoundStatus.TeamApproved: return <Loader />;
            case RoundStatus.TeamDenied: return <Loader />;
            case RoundStatus.VotingExpedition: return <ExpeditionVote me={playerStore!.currentPlayer} game={game} />
            case RoundStatus.MissionSuccess: return <Loader />;
            case RoundStatus.MissionFailed: return <Loader />;
        }
        return
    }
    return( 
        (() => {
            if(game.status === GameStatus.WaitingForPlayers) return <WaitingForPlayers game={game}/>
            if(game.status === GameStatus.Playing) {
                return(
                    <div className="client-background">
                        {content()}
                        <RoleModal me={playerStore!.currentPlayer} showModal={showModal} toggleModal={toggleModal} />
                        <Button
                            onClick={toggleModal}
                            className="button ros roleButton"
                        >
                            Role
                        </Button>
                        <Button
                            onClick={() => updateGame(true)}
                            className="button ros reloadButton"
                        >
                            <ReloadOutlined />
                        </Button>
                    </div>
                )
            }
            if(game.status === GameStatus.AssassinTurn) return <AssassinTurn me={playerStore!.currentPlayer} game={game} />
            if(game.status === GameStatus.Ended) return <GameEnded />
            return null;
        })()
    )   
}

export default inject(Stores.GameStore)(inject(Stores.PlayerStore)(observer(PlayGame)));
