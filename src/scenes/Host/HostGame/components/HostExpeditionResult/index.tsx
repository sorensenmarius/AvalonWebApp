import React, { useState, useEffect } from 'react'
import {observer, inject } from 'mobx-react';
import { Game } from '../../../../../models/Game/game';
import { Row, Col } from 'antd';
import Stores from '../../../../../stores/storeIdentifier';
import GameStore from '../../../../../stores/gameStore';
import './index.less';


interface HostExpeditionResultProps {
    game: Game
    gameStore?: GameStore
}

const HostExpeditionResult = (props: HostExpeditionResultProps) => {
    const { game, gameStore } = props;
    const [votes, setVotes] = useState<boolean[]>([]);

    useEffect(() => {
        const lastRound = game.currentRound
        let tmpVotes: boolean[] = []
        for(let i = 0; i < lastRound.missionVoteGood; i++) {
            tmpVotes.push(true)
        }
        for(let i = 0; i < lastRound.missionVoteBad; i++) {
            tmpVotes.push(false)
        }
        setVotes(tmpVotes)

        setTimeout(reveal, 3000, tmpVotes)
        setTimeout(nextScreen, 1000 * tmpVotes.length + 13000)
    }, [])

    const reveal = (tmpVotes: boolean[]) => {
        for(let i = 0; i < tmpVotes.length; i++) {
            setTimeout(() => {
                let currentVote = document.getElementById('flipVote'+i)
                currentVote?.classList.add('flip-vote-reveal')
            }, 1000 * i + 1)
        }
    }

    const nextScreen = async () => {
        gameStore?.nextRound(game.id);
    }

    return(
        <Row
            justify="center"
            className="verticallyCentered"
        >
            {votes.map((v, index) => (
                <Col>
                    <div 
                        style={{
                            width: 'calc(80vw / ' + votes.length + ')',
                            height: 'calc(80vw / ' + votes.length + ')'
                        }}
                        className="flip-vote" 
                        id={'flipVote'+index} 
                        key={'flipVote'+index}
                    >
                        <div className="flip-vote-inner">
                            <div className="flip-vote-front" />
                            <div className={(v ? 'goodVote' : 'evilVote') + ' flip-vote-back'} />
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    )
}

export default inject(Stores.GameStore)(observer(HostExpeditionResult));
