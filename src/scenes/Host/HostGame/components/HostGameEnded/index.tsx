import React from 'react'
import { observer } from 'mobx-react'
import { Row, Col } from 'antd'
import { Game } from '../../../../../models/Game/game'
import { Player } from '../../../../../models/Players/player'

interface HostGameEndedProps {
    game: Game
}

const HostGameEnded = (props: HostGameEndedProps) => {
    const { game } = props

    return(
        <React.Fragment>
            <Row>
                <h1>Game has ended!</h1>
            </Row>
            <Row>
                <Col>
                    <Row>
                        Good rounds
                    </Row>
                    <Row>
                        {game.pointsInnocent}
                    </Row>
                </Col>
                <Col>
                    <Row>
                        Evil rounds
                    </Row>
                    <Row>
                        {game.pointsEvil}
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row><h1>Congrats to</h1></Row>
                    <Row>
                    {(() => {if(game.pointsInnocent > game.pointsEvil) {
                            return(
                                game.players.filter(p => !p.isEvil).map((p: Player) => (
                                    <Col>
                                        <Row>
                                            <h3>{p.roleName}</h3>
                                        </Row>
                                        <Row>
                                            <h2>{p.name}</h2>
                                        </Row>
                                    </Col>
                                ))
                            )
                        } else {
                            return(
                                game.players.filter(p => p.isEvil).map((p: Player) => (
                                    <Col>
                                        <Row>
                                            <h3>{p.roleName}</h3>
                                        </Row>
                                        <Row>
                                            <h2>{p.name}</h2>
                                        </Row>
                                    </Col>
                                ))
                            )
                        }
                    })()}
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default observer(HostGameEnded)