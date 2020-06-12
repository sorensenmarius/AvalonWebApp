import React, { useState, useEffect } from 'react';
import { Row, Col, Button, List } from 'antd';
import { inject, observer } from 'mobx-react';
import Stores from '../../stores/storeIdentifier';
import './index.less';
// import signalRAspNetCoreHelper from '../../lib/signalRAspNetCoreHelper';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { Player } from '../../models/Players/player';
// import GameStore from '../../stores/gameStore';
declare var abp: any;

// interface GameStartProps {
//     gameStore: GameStore;
// }
const GameStart = (props: any) => {
    // const [socket, setSocket] = useState<HubConnection>();
    const [game, setGame] = useState(props.gameStore.currentGame);

    useEffect(() => {
        setGame(props.gameStore.currentGame)
    }, [props.gameStore.currentGame])

    const createGame = async () => {
        await props.gameStore.createGame()
        await initSocket()
    }

    const initSocket = async () => {
        const connect = new HubConnectionBuilder()
            .withUrl('https://avalon-api.s0rensen.no/gameHub')
            .build()

        try {
            await connect.start()
            connect.invoke("JoinGameGroup", props.gameStore.currentGame.id)
        } catch(err) {
            console.log(err)
        }
        connect.on("GameUpdated", function() {
            props.gameStore.get(props.gameStore.currentGame.id);
        })

        // setSocket(connect)
    }

    let view;
    if(game.joinCode) {
        view = 
            <>
                <h3>Join the game on your device with this code:</h3>
                <h1>{game.joinCode}</h1>
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
                    dataSource={game.players} 
                    renderItem={(player: Player) => (
                        <List.Item>
                            {player.name}
                        </List.Item>
                    )}/>
            </>
    } else {
        view = <Row><Button onClick={createGame}>Create Game</Button></Row>
    }

    return(
        <Row justify="center">
            <Col sm={24} lg={16} xl={10}>
                <Row justify="center" className="createGameView">
                    <Col>
                        {view}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default inject(Stores.GameStore)(observer(GameStart));