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
import HostAssassinTurn from './components/HostAssassinTurn';
import HostGameEnded from './components/HostGameEnded';
import HostPlayerOrder from './components/HostPlayerOrder';
import { Col, Row } from 'antd';
import HostPreviousRounds from './components/HostPreviousRounds';
import './index.less';

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

    const currentContent = () => {
        switch(game.currentRound.status) {
            case RoundStatus.SelectingTeam: return <HostSelectingTeam game={game} />
            case RoundStatus.VotingForTeam: return <HostVoting expedition={false} game={game} key="teamVote" />
            case RoundStatus.TeamApproved: return <HostTeamVoteResult accepted={true} game={game} key="teamVoteSuccessful"/>;
            case RoundStatus.TeamDenied: return <HostTeamVoteResult accepted={false} game={game} key="teamVoteFailed"/>;
            case RoundStatus.VotingExpedition: return <HostVoting expedition={true} game={game} key="expeditionVote" />;
        }
        return null
    }

    return(
        (() => {
            if(game.status === GameStatus.WaitingForPlayers) return <GameStart game={game}/>
            if(game.status === GameStatus.Playing){
                return(
                    <React.Fragment>
                        <video autoPlay muted loop className="playingBackground" >
                            <source src="/images/torches.webm" type="video/mp4" />
                        </video>
                        {/* Hides side content while revealing team */}
                        {game.currentRound.status === RoundStatus.MissionFailed || game.currentRound.status === RoundStatus.MissionSuccess
                            ?
                                <HostExpeditionResult game={game} /> 
                            :
                            <Row>
                                <Col
                                    span={6}
                                >
                                    <HostPreviousRounds game={game} />
                                </Col>
                                <Col
                                    className = "MainContent"
                                    span={12}>
                                    {currentContent()}
                                </Col>
                                <Col
                                    span={6}
                                >
                                    <HostPlayerOrder game={game} />
                                </Col>
                            </Row>
                        }
                    </React.Fragment>
                )
            } 
            
            if(game.status === GameStatus.AssassinTurn) return <HostAssassinTurn game={game} />
            if(game.status === GameStatus.Ended) return <HostGameEnded game={game} />
            return null;
        })()
    )
}

export default inject(Stores.GameStore)(inject(Stores.PlayerStore)(observer(HostGame)));
