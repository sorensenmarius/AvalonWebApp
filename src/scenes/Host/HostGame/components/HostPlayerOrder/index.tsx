import React from 'react'
import { observer } from 'mobx-react'
import { Game } from '../../../../../models/Game/game'
import { Player } from '../../../../../models/Players/player'
import { Row, Col } from 'antd'
import "./index.less"

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
        <Row  className = "OrderPlayerComp">
            <div className ="Backgroundcontainer">
                <img src="/images/Scroll.png" width = "100%" height= "100%" alt=""/>
            </div>
            <div className = "Contentcontainer">
                <div>
                    <h1>The Player order is: </h1>
                </div>
                <Col>

            
                {orderedPlayers().map((p: Player, i: number) => (
                        <Row justify="center" className = "PlayerNameContainer" key={p.id + HostPlayerOrder  }>
                        <div className = "OnePlayer">
                            <h3>{p.name}</h3>
                        </div>
                        </Row>
                ))}
                </Col>
             </div>
        </Row>

    )
}

export default observer(HostPlayerOrder)