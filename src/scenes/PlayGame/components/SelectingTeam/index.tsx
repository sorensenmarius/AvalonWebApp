import React from 'react';
import { Col, Row, Checkbox } from 'antd';
import { observer } from 'mobx-react';
import { Player } from '../../../../models/Players/player';
import { Round } from '../../../../models/Round/round';
import { Game } from '../../../../models/Game/game';
interface SelectingTeamProps {
    me: Player,
    game: Game
}

const SelectingTeam = (props: SelectingTeamProps) => {
    const {me, game} = props;

    const checkedPlayer = async (e: any) => {
        console.log(e.target.checked)
    }

    return(
        <Row justify="center" className="selectingTeam">
            <Col sm={16} lg={8}>
                {(() => {
                    if(me.id === game.currentRound.currentPlayer.id) {
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