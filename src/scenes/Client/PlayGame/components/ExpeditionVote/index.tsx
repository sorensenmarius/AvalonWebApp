import React, { useState, useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col, notification } from 'antd'
import RoundStore from '../../../../../stores/roundStore'
import { Game } from '../../../../../models/Game/game'
import Stores from '../../../../../stores/storeIdentifier'
import { Player } from '../../../../../models/Players/player'
interface ExpeditionVoteProps {
    me: Player;
    game: Game;
    roundStore?: RoundStore;
}

const ExpeditionVote = (props: ExpeditionVoteProps) => {
    const { me, game, roundStore } = props
    const [voted, setVoted] = useState<Boolean>(false)
    const [canVote, setCanVote] = useState(false)

    useEffect(() => {
        setCanVote(game.currentRound.currentTeam.some(p => p.id === me.id))
    }, [game.currentRound.currentTeam, me.id])

    const handleVote = async (accepted: Boolean) => {
        if(!accepted && !me.isEvil) {
            notification.error({
                message: 'Cannot reject expedition when you are good',
                placement: 'bottomRight'
            })
            return
        }
        setVoted(true)
        await roundStore?.expeditonVote(me.id, game.id, accepted)
    }

    return(
        <Row justify="center">
            <Col>
                {(() => {
                    if(canVote) {
                        if(voted) {
                            return(
                                <h1>Waiting for all votes</h1>
                            )
                        } else {
                            return (
                                <React.Fragment>
                                    <h1>Voting for expedition</h1>
                                    <Row>
                                        <button 
                                            className="button ros"
                                            onClick={() => handleVote(true)}
                                        >
                                            Success
                                        </button>
                                    </Row>
                                    <Row>
                                        <button 
                                            className="button ros redBackground"
                                            onClick={() => handleVote(false)}
                                        >
                                            Failure
                                        </button>
                                    </Row>
                                </React.Fragment>
                            )
                        }
                    } else {
                        return(<h1>Waiting for players on expedition to vote</h1>)
                    }
                })()}
            </Col>
        </Row>
    )
}

export default inject(Stores.RoundStore)(observer(ExpeditionVote))