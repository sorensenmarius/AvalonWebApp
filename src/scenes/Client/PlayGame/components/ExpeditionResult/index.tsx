import React from 'react'
import {observer } from 'mobx-react';
import { Game } from '../../../../../models/Game/game';
import { Row, Col } from 'antd';

interface ExpeditionResultProps {
    game: Game
    accepted: Boolean
}

const ExpeditionResult = (props: ExpeditionResultProps) => {
    const { accepted, game } = props;

    return(
        <Row
            justify="center"
        >
            <Col>
            {(() => {
                        if(accepted) {
                            return(
                                <React.Fragment>
                                    <h1>The mission was successful!</h1>
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
                                    <h1>The mission failed!</h1>
                                    <Row>
                                        <h2>The next player to choose a team is {game.currentPlayer.name}</h2>
                                    </Row>
                                </React.Fragment>
                            )
                        }
                    })()}
            </Col>
        </Row>
    )
}

export default observer(ExpeditionResult);
