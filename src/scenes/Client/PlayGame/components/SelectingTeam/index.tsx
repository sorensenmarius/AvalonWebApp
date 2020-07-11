import React, { useState } from 'react';
import { Col, Row, Checkbox, Button } from 'antd';
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
    const [players] = useState<Player[]>(game.players)
    
    const checkedPlayer = async (playerId: string) => {
        if(game.currentRound.currentTeam && game.currentRound.currentTeam.some(p => p.id === playerId)) {
            game.currentRound.currentTeam.splice(game.currentRound.currentTeam.findIndex(p => p.id === playerId), 1)
            roundStore?.removePlayerFromTeam(playerId, game.id)
        } else {
            const tempPlayer = game.players.find(p => p.id === playerId)
            if(tempPlayer) {
                game.currentRound.currentTeam.push(tempPlayer)
            }
            roundStore?.addPlayerToTeam(playerId, game.id)
        }
    }

    const submitTeam = async () => {
        props.roundStore?.submitTeam(game.id);
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
                                {players.map((p: Player) => 
                                    <Row justify="center" key={p.id}>
                                        <Checkbox 
                                            onChange={() => checkedPlayer(p.id)}
                                            checked={game.currentRound.currentTeam.some((item: Player) => item.id === p.id)}
                                        >
                                            {p.name}
                                        </Checkbox>
                                    </Row>
                                )}
                                <Button onClick={submitTeam}>Submit Team</Button>
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
