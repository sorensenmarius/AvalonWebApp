import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Row, Col } from 'antd'
import { Game } from '../../../../../models/Game/game'
import { Player } from '../../../../../models/Players/player'
import PlayerRole from '../../../../../models/Players/playerRole'
import './index.less'
interface HostGameEndedProps {
    game: Game
}

const HostGameEnded = (props: HostGameEndedProps) => {
    const { game } = props

    useEffect(() => {
        console.log(game)
    })

    const assassinString = () => {
        if(game.pointsEvil > 10) { // If Assassination
            return(
                <h2>{game.players.find(p => p.roleId === PlayerRole.Assassin)?.name} assassinated Merlin!</h2>
            )
        }
        return
    }

    return(
        <React.Fragment>
            <div className='gameEnded'>
                <Row justify='center'>
                    <h1>Game has ended!</h1>
                </Row>
                <Row
                    justify='center'
                    gutter={[32, 16]}
                >
                    <Col>
                        <Row justify='center'>
                            <h3>Good rounds</h3>
                        </Row>
                        <Row justify='center'>
                            <h2>{game.pointsInnocent}</h2>
                        </Row>
                    </Col>
                    <Col>
                        <Row justify='center'>
                            <h3>Evil rounds</h3>
                        </Row>
                        <Row justify='center'>
                            <h2>{game.pointsEvil > 10 ? game.pointsEvil - 100 : game.pointsEvil}</h2>
                        </Row>
                    </Col>
                </Row>
                <Row
                    justify='center'
                >
                    <Col>
                        <Row justify='center'><h1>Congrats to</h1></Row>
                        <Row
                            justify='center'
                            gutter={[24, 8]}
                        >
                        {(() => {if(game.pointsInnocent > game.pointsEvil) {
                                return(
                                    game.players.filter(p => !p.isEvil).map((p: Player) => (
                                        <Col
                                            key={p.id}
                                        >
                                            <Row justify='center'>
                                                <h3>{p.roleName}</h3>
                                            </Row>
                                            <Row justify='center'>
                                                <h2>{p.name}</h2>
                                            </Row>
                                        </Col>
                                    ))
                                )
                            } else {
                                return(
                                    game.players.filter(p => p.isEvil).map((p: Player) => (
                                        <Col
                                            key={p.id}
                                        >
                                            <Row justify='center'>
                                                <h3>{p.roleName}</h3>
                                            </Row>
                                            <Row justify='center'>
                                                <h2>{p.name}</h2>
                                            </Row>
                                        </Col>
                                    ))
                                )
                            }
                        })()}
                        </Row>
                        <Row>
                            {assassinString()}
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='gameEndedBg' id={game.pointsInnocent > game.pointsEvil ? 'goodWin' : 'evilWin'} />
        </React.Fragment>
    )
}

export default observer(HostGameEnded)