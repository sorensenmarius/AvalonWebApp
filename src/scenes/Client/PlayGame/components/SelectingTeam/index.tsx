import React from 'react';
import { Col, Row, Checkbox } from 'antd';
import { observer, inject } from 'mobx-react';
import { Player } from '../../../../../models/Players/player';
import { Game } from '../../../../../models/Game/game';
import './index.less';
import RoundStore from '../../../../../stores/roundStore';
import Stores from '../../../../../stores/storeIdentifier';

interface SelectingTeamProps {
    me: Player,
    game: Game,
    roundStore?: RoundStore
}

const SelectingTeam = (props: SelectingTeamProps) => {
    const {me, game, roundStore} = props;
    
    const checkedPlayer = async (playerId: string) => {
        console.log(game)
        if(game.currentRound.currentTeam && game.currentRound.currentTeam.some(p => p.id === playerId)) {
            roundStore?.removePlayerFromTeam(playerId, game.id)
        } else {
            roundStore?.addPlayerToTeam(playerId, game.id)
        }
    }

    return(
        <Row justify="center" className="selectingTeam">
            <Col sm={16} lg={8}>
                {(() => {
                    if(me.id === game.currentPlayer.id) {
                        return(
                            <>
                                <h2>Pick a team!</h2>
                                <h3>You need X players for this mission.</h3>
                                {game.players.map((p: Player) => 
                                    <Row justify="center">
                                        <Checkbox key={p.id} onChange={() => checkedPlayer(p.id)}>
                                            {p.name}
                                        </Checkbox>
                                    </Row>
                                )}
                            </>
                        )
                    }
                    return(
                        <h1 className="header">{ game.currentPlayer.name } is picking a team!</h1>
                    )
                })()}
            </Col>
        </Row>
    )
}

export default inject(Stores.RoundStore)(observer(SelectingTeam))
