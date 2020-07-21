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
            <Row
            justify="center"
        >
            <Col>
                <h1 className="header">These players are on a Mission</h1>
                <List
                className = "ItemList"
                    grid={{
                        gutter: 0,
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 1,
                        xl: 1,
                        xxl: 1}}
                    dataSource={game.currentRound.currentTeam} 
                    renderItem={(player: Player) => (
                        <List.Item>
                                <Row justify = "center"  >
                                    <div className ="NameTagRow">
                                    <span className = "PlayerName">{player.name}</span> 
                                    </div>
                                </Row>
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
                    className = "ItemList"
                        grid={{
                            gutter: 0,
                            xs: 1,
                            sm: 1,
                            md: 1,
                            lg: 1,
                            xl: 1,
                            xxl: 1}}
                        dataSource={game.currentRound.currentTeam} 
                        renderItem={(player: Player) => (
                            <List.Item>
                                    <Row justify = "center"  >
                                        <div className ="NameTagRow">
                                        <span className = "PlayerName">{player.name}</span> 
                                        </div>
                                    </Row>
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