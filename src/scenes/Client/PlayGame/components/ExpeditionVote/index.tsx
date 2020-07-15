import React, { useState, useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col, Button } from 'antd'
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
    })

    const handleVote = async (accepted: Boolean) => {
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
                                    <h1>Voting for team</h1>
                                    <Button 
                                        type="primary"
                                        onClick={() => handleVote(true)}
                                    >
                                        Accept
                                    </Button>
                                    <Button 
                                        type="primary"
                                        danger
                                        onClick={() => handleVote(false)}
                                    >
                                        Decline
                                    </Button>
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