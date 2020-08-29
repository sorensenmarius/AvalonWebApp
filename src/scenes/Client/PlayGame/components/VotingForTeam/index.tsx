import React, { useState } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col } from 'antd'
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
    const [voteStatus, setVoteStatus] = useState<Number>(0)

    const handleVote = async (accepted: Boolean) => {
        if(voteStatus !== 0) return
        setVoteStatus(1)
        sendVote(accepted)
    }

    
    const sendVote = async (accepted: Boolean) => {
        setVoteStatus(1)
        let res = await roundStore?.voteForTeam(me.id, game.id, accepted)
        console.log(res)
        if(res !== null) { 
            setVoteStatus(2) 
        } else {
            console.log('Team vote failed, trying again!')
            sendVote(accepted)
        } 
    }

    return(
        <Row justify="center">
            <Col>
                {(() => {
                    if(voteStatus === 2) {
                        return(
                            <h1>Waiting for all votes</h1>
                        )
                    } else {
                        return (
                            <React.Fragment>
                                <h1>Voting for team</h1>
                                <Row>
                                    <button 
                                        className="button ros"
                                        onClick={() => handleVote(true)}
                                    >
                                        Accept
                                    </button>
                                </Row>
                                <Row>
                                    <button 
                                        className="button ros redBackground"
                                        onClick={() => handleVote(false)}
                                    >
                                        Decline
                                    </button>
                                </Row>
                            </React.Fragment>
                        )
                    }
                })()}
            </Col>
        </Row>
    )
}

export default inject(Stores.RoundStore)(observer(VotingForTeam))