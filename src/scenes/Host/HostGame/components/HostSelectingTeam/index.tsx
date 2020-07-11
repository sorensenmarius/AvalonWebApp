import React from 'react'
import {observer } from 'mobx-react';
import { Game } from '../../../../../models/Game/game';
import { Row, Col, List } from 'antd';
import { Player } from '../../../../../models/Players/player';

interface HostSelectingTeamProps {
    game: Game
}

const HostSelectingTeam = (props: HostSelectingTeamProps) => {
    const { game } = props;

    return(
        <Row
            justify="center"
        >
            <Col>
                <h1 className="header">{ game.currentPlayer.name } is picking a team!</h1>
                <h3>Current Players:</h3>
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
                    renderItem={(player: Player) => (
                        <List.Item>
                            {player.name}
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
}

export default observer(HostSelectingTeam);
