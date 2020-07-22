import React from 'react';
// import { Col, List, Row } from 'antd';
// import { Player } from '../../../../../models/Players/player';
import { observer } from 'mobx-react';
import './index.less'
import Loader from '../Loader';

const WaitingForPlayers = (props: any) => {
    // const { game } = props

    return (
        <>
            <div className="waitingForPlayers-background">
                <h1>Waiting for players</h1>
                <Loader />
            </div>
        </>
    )

    // return(
    //     <Row justify="center" className="waitingForPlayers">
    //         <Col sm={16} lg={8}>
    //             <h1 className="header">Waiting for players</h1>
    //             <List                        
    //                 grid={{
    //                     gutter: 16,
    //                     xs: 1,
    //                     sm: 2,
    //                     md: 4,
    //                     lg: 4,
    //                     xl: 6,
    //                     xxl: 3}}
    //                 dataSource={game.players}
    //                 renderItem={(item: Player) => (
    //                     <List.Item>
    //                         <span>{ item.name }</span>
    //                     </List.Item>
    //                 )}
    //                 />
    //         </Col>
    //     </Row>
    // )
}

export default observer(WaitingForPlayers);