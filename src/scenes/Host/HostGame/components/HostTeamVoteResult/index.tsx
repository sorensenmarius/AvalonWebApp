import React, { useEffect, useState } from 'react'
import {observer, inject } from 'mobx-react';
import { Game } from '../../../../../models/Game/game';
import { Row, Col, Progress } from 'antd';
import Stores from '../../../../../stores/storeIdentifier';
import RoundStore from '../../../../../stores/roundStore';
import RoundStatus from '../../../../../models/Round/roundStatus';
import './index.less';


interface HostTeamVoteResultProps {
    game: Game
    accepted: Boolean
    roundStore?: RoundStore
}

const HostTeamVoteResult = (props: HostTeamVoteResultProps) => {
    const { accepted, game, roundStore } = props;
    const [ms, setMs] = useState(20000);
    const [goodTeamVotes, setGoodTeamVotes] = useState(0);
    const [evilTeamVotes, setEvilTeamVotes] = useState(0)
    
    useEffect(() => {
        setTimeout(nextScreen, ms)

        const interval = setInterval(() => {
            setMs(ms => ms - 100)
        }, 100)

        setTimeout(() => {
            for(let i = 0 ; i < game.currentRound.votesForTeam; i++) {
                setTimeout(() => {
                    setGoodTeamVotes(i + 1)
                }, 500 * i)
            }

            for(let i = 0 ; i < game.currentRound.votesAgainstTeam; i++) {
                setTimeout(() => {
                    setEvilTeamVotes(i + 1)
                }, 500 * i)
            }
        }, ms * 0.15)

        return () => clearInterval(interval)
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const nextScreen = async () => {
        if (accepted) {
            await roundStore?.setRoundStatus(game.id, RoundStatus.VotingExpedition)
        } else {
            await roundStore?.setRoundStatus(game.id, RoundStatus.SelectingTeam)
        }
    }


    return(
        <>
            <Row
                justify="center"
                gutter={[24, 16]}
            >
                <Col>
                    <Row>
                        <h3>Votes for</h3>
                    </Row>
                    <Row>
                        <span className='teamVoteNumber' id='goodTeamVoteNumber'>{goodTeamVotes}</span>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <h3>Votes against</h3>
                    </Row>
                    <Row>
                        <span className='teamVoteNumber' id='evilTeamVoteNumber'>{evilTeamVotes}</span>
                    </Row>
                </Col>
            </Row>
            <Progress 
                style={{
                    width: '100vw',
                    position: 'fixed',
                    bottom: '0',
                    left: '0'
                }} 
                strokeLinecap='square'
                strokeColor='#b02604'
                percent={ms/200} 
                format={() => ""} 
                key="teamProgressBar" 
            />
        </>
    )
}

export default inject(Stores.RoundStore)(observer(HostTeamVoteResult));
