import React from 'react'
import {observer } from 'mobx-react';
import { Game } from '../../../../../models/Game/game';
import { Row, Col } from 'antd';
import { Player } from '../../../../../models/Players/player';

interface HostTeamVoteResultProps {
    game: Game
    accepted: Boolean
}

const HostTeamVoteResult = (props: HostTeamVoteResultProps) => {
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
                                    <h1>The vote was successful!</h1>
                                    <Row justify="center">
                                        {game.currentRound.currentTeam.map((p: Player) => (
                                            <Col>
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
            </Col>
        </Row>
    )
}

export default observer(HostTeamVoteResult);
