import React, { useState, useEffect } from 'react';
import { Col, Row, Checkbox, Button, notification } from 'antd';
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
    const [currentTeam, setCurrentTeam] = useState<string[]>([])
    
    useEffect(() => {
        roundStore?.setTeam(game.id, currentTeam)
    }, [currentTeam])

    const checkedPlayer = async (playerId: string) => {
        if (currentTeam.includes(playerId)) {
            setCurrentTeam(currentTeam.filter((id: string) => id !== playerId))
        } else {
            var tmp = [...currentTeam]
            tmp.push(playerId)
            setCurrentTeam(tmp)
        }
    }

    const submitTeam = async () => {
        if(game.currentRound.requiredPlayers !== currentTeam.length) {
            return notification.error({
                message: `You need to select exactly ${game.currentRound.requiredPlayers} for this expedition`
            })
        }
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
                                <h3>You need {game.currentRound.requiredPlayers} players for this mission.</h3>
                                {players.map((p: Player) => 
                                    <Row justify="center" key={p.id}>
                                        <Checkbox 
                                            onChange={() => checkedPlayer(p.id)}
                                            checked={currentTeam.some((id: string) => id === p.id)}
                                        >
                                            {p.name}
                                        </Checkbox>
                                    </Row>
                                )}
                                <button
                                    className={`button ros ${game.currentRound.requiredPlayers !== currentTeam.length ? 'redText' : ''}`}
                                    onClick={submitTeam}
                                >
                                    Submit Team
                                </button>
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
