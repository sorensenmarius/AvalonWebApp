import React, { useState } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col, Button } from 'antd'
import RoundStore from '../../../../../stores/roundStore'
import { Game } from '../../../../../models/Game/game'
import Stores from '../../../../../stores/storeIdentifier'
import { Player } from '../../../../../models/Players/player'
interface VotingForTeamProps {
    me: Player;
    game: Game;
    roundStore?: RoundStore;
}

const VotingForTeam = (props: VotingForTeamProps) => {
    const { me, game, roundStore } = props
    const [voted, setVoted] = useState<Boolean>(false)

    const handleVote = async (accepted: Boolean) => {
        setVoted(true)
        await roundStore?.voteForTeam(me.id, game.id, accepted)
    }

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

export default inject(Stores.RoundStore)(observer(VotingForTeam))