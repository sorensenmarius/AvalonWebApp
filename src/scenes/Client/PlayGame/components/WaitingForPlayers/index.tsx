import React from 'react';
import { Col, List, Row } from 'antd';
import { Player } from '../../../../../models/Players/player';
import { observer } from 'mobx-react';
import './index.less'

const WaitingForPlayers = (props: any) => {
    const { game } = props

    return(
        <Row justify="center" className="waitingForPlayers">
            <Col sm={16} lg={8}>
                <h1 className="header">Waiting for players</h1>
                <List
                    dataSource={game.players}
                    renderItem={(item: Player) => (
                        <List.Item>
                            <span>{ item.name }</span>
                        </List.Item>
                    )}
                    />
            </Col>
        </Row>
    )
}

export default observer(WaitingForPlayers);