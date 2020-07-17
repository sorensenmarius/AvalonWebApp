import React, { useEffect, useState } from 'react'
import {observer, inject } from 'mobx-react';
import { Game } from '../../../../../models/Game/game';
import { Row, Col, Progress } from 'antd';
import { Player } from '../../../../../models/Players/player';
import Stores from '../../../../../stores/storeIdentifier';
import RoundStore from '../../../../../stores/roundStore';
import RoundStatus from '../../../../../models/Round/roundStatus';

interface HostTeamVoteResultProps {
    game: Game
    accepted: Boolean
    roundStore?: RoundStore
}

const HostTeamVoteResult = (props: HostTeamVoteResultProps) => {
    const { accepted, game, roundStore } = props;
    const [seconds, setSeconds] = useState(2000)

    useEffect(() => {
        setTimeout(nextScreen, seconds * 10)
        const interval = setInterval(() => {
            setSeconds(seconds => seconds - 1)
            console.log(seconds)
        }, 10)
        return () => clearInterval(interval)
    }, [])

    const nextScreen = async () => {
        if (accepted) {
            await roundStore?.setRoundStatus(game.id, RoundStatus.VotingExpedition)
        } else {
            await roundStore?.setRoundStatus(game.id, RoundStatus.SelectingTeam)
        }
    }


    return(
        <Row
            justify="center"
        >
            <Col>
            {(() => {
                        if(accepted) {
                            return(
                                <React.Fragment>
                                    <h1>The vote was successful!</h1>
                                    <Row
                                        gutter={[16, 24]}
                                    >
                                        <Col span={8}>
                                            Votes for team
                                        </Col>
                                        <Col span={8}>
                                            Votes against team
                                        </Col>
                                    </Row>
                                    <Row
                                        gutter={[16, 24]}
                                    >
                                        <Col span={8}>
                                            {game.currentRound.votesForTeam}
                                        </Col>
                                        <Col span={8}>
                                            {game.currentRound.votesAgainstTeam}
                                        </Col>
                                    </Row>
                                    <Row justify="center">
                                        {game.currentRound.currentTeam.map((p: Player) => (
                                            <Col key={"hostTeamVoteResultName" + p.name}>
                                                {p.name}  
                                            </Col>
                                        ))}
                                    </Row>
                                    <Row>
                                        <h2>Are going on an adventure!</h2>
                                    </Row>
                                </React.Fragment>
                            )
                        } else {
                            return (
                                <React.Fragment>
                                    <h1>The vote failed!</h1>
                                    <Row>
                                        <h2>The next player to choose a team is {game.currentPlayer.name}</h2>
                                    </Row>
                                </React.Fragment>
                            )
                        }
                    })()}
                <Row>
                    <Progress percent={seconds/20} format={() => ""} key="teamProgressBar" />
                </Row>
            </Col>
        </Row>
    )
}

export default inject(Stores.RoundStore)(observer(HostTeamVoteResult));
