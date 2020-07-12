import React, { useState } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col, Button } from 'antd'
import RoundStore from '../../../../../stores/roundStore'
import { Player } from '../../../../../models/Players/player'
import { Game } from '../../../../../models/Game/game'
import Stores from '../../../../../stores/storeIdentifier'
interface HostVotingProps {
    expedition: Boolean;
    me: Player;
    game: Game;
    roundStore?: RoundStore;
}

const HostVoting = (props: HostVotingProps) => {
    const { expedition, me, game, roundStore } = props
    const [voted, setVoted] = useState<Boolean>(false)

    const handleVote = async (accepted: Boolean) => {
        setVoted(true)
        await roundStore?.voteForTeam(me.id, game.id, accepted)
    }

    if(expedition) {
        return(
            <h1>Voting for expedition</h1>
        )
    } else {
        return(
            <Row justify="center">
                <Col>
                    {(() => {
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
                    })()}
                </Col>
            </Row>
        )
    }
}

export default inject(Stores.RoundStore)(observer(HostVoting))