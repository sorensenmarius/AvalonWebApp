import React, { useState } from 'react';
import { Col, Row, Checkbox } from 'antd';
import { observer } from 'mobx-react';
import './index.less'
import { Player } from '../../../../models/Players/player';

const SelectingTeam = (props: any) => {
    const [me] = useState(props.me)
    const [game] = useState(props.game)
    const [round] = useState(props.round)

    const checkedPlayer = async (e: any) => {
        console.log(e.target.checked)
    }

    return(
        <Row justify="center" className="selectingTeam">
            <Col sm={16} lg={8}>
                {(() => {
                    if(me.id === round.currentPlayer.id) {
                        return(
                            <>
                                <h2>Pick a team!</h2>
                                <h3>You need X players for this mission.</h3>
                                {(() => {
                                    game.players.map((p: Player) => {
                                        return(
                                            <Checkbox key={p.id} onChange={checkedPlayer}>
                                                {p.name}
                                            </Checkbox>
                                        )
                                    })
                                })()}
                            </>
                        )
                    }
                    return(
                        <h1 className="header">{ round.currentPlayer } is picking a team!</h1>
                    )
                })()}
            </Col>
        </Row>
    )
}

export default observer(SelectingTeam);