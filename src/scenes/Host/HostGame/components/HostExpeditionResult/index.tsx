import React, { useState, useEffect } from 'react'
import {observer, inject } from 'mobx-react';
import { Game } from '../../../../../models/Game/game';
import { Row, Col, Progress } from 'antd';
import Stores from '../../../../../stores/storeIdentifier';
import GameStore from '../../../../../stores/gameStore';

interface HostExpeditionResultProps {
    game: Game
    accepted: Boolean
    gameStore?: GameStore
}

const HostExpeditionResult = (props: HostExpeditionResultProps) => {
    const { accepted, game, gameStore } = props;
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
        gameStore?.nextRound(game.id);
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
                                    <Row>
                                        <h1>The mission was successful!</h1>
                                    </Row>
                                    <Row>
                                        <h2>Score:</h2>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h3>Good: {game.pointsInnocent}</h3>
                                        </Col>
                                        <Col>
                                            <h3>Evil: {game.pointsEvil}</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h3>The next player to choose a team is {game.currentPlayer.name}</h3>
                                    </Row>
                                </React.Fragment>
                            )
                        } else {
                            return (
                                <React.Fragment>
                                    <Row>
                                        <h1>The mission failed!</h1>
                                    </Row>
                                    <Row>
                                        <h2>Score:</h2>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h3>Good: {game.pointsInnocent}</h3>
                                        </Col>
                                        <Col>
                                            <h3>Evil: {game.pointsEvil}</h3>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h3>The next player to choose a team is {game.currentPlayer.name}</h3>
                                    </Row>
                                </React.Fragment>
                            )
                        }
                    })()}
                <Row>
                    <Progress percent={seconds/20} format={() => ""} key="expeditionProgressBar"/>
                </Row>
            </Col>
        </Row>
    )
}

export default inject(Stores.GameStore)(observer(HostExpeditionResult));
