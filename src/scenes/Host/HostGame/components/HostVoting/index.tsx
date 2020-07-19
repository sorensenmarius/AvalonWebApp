import React from 'react'
import { observer } from 'mobx-react'
import { Row, Col, List } from 'antd'
import { Player } from '../../../../../models/Players/player'
import { Game } from '../../../../../models/Game/game'
import './index.less';

interface HostVotingProps {
    expedition: Boolean;
    game: Game;
}

const HostVoting = (props: HostVotingProps) => {
    const { expedition, game } = props

    if(expedition) {
        return(
            <Row justify="center">
                <Col>
                    <h1>These players are on a mission</h1>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 3}}
                        dataSource={game.currentRound.currentTeam}
                        renderItem={(p: Player) => (
                            <List.Item>
                                <span>{ p.name }</span>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        )
    } else {
        return(
            <Row justify="center">
                <Col>
                    <h1>Voting for team</h1>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 3}}
                        dataSource={game.currentRound.currentTeam}
                        renderItem={(p: Player) => (
                            <List.Item>
                                <span>{ p.name }</span>
                            </List.Item>
                        )}
                    />
                    <h2>Recorded {game.currentRound.votesForTeam + game.currentRound.votesAgainstTeam} out of {game.players.length} votes</h2>
                </Col>
            </Row>
        )
    }
}

export default observer(HostVoting);