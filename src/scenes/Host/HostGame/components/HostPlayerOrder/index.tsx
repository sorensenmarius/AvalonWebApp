import React from 'react'
import { observer } from 'mobx-react'
import { Game } from '../../../../../models/Game/game'
import { Player } from '../../../../../models/Players/player'
import { Row, Col } from 'antd'

interface HostPlayerOrderProps {
    game: Game
}

const HostPlayerOrder = (props: HostPlayerOrderProps) => {
    const { game } = props

    const orderedPlayers = () => {
        let op: Player[] = []
        for (let i = game.counter; i < game.counter + game.players.length; i++) {
            op.push(game.players[i % game.players.length])
        }
        return op;
    }

    return(
        <Row>
            {orderedPlayers().map((p: Player, i: number) => (
                <React.Fragment>
                    <Col>
                        <h3>{p.name}</h3>
                    </Col>
                    {(() => {
                        if(orderedPlayers().length !== i + 1) {
                            return(
                                <Col>
                                    -&gt;
                                </Col>
                            )
                        }
                        return
                    })()}
                </React.Fragment>
            ))}
        </Row>
    )
}

export default observer(HostPlayerOrder)