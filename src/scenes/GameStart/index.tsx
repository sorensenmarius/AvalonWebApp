import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import Stores from '../../stores/storeIdentifier';
import './index.less';

const GameStart = (props: any) => {
    const [game, setGame] = useState(props.gameStore.currentGame);

    useEffect(() => {
        setGame(props.gameStore.currentGame)
    })

    const createGame = async () => {
        await props.gameStore.createGame()
    }

    let view;
    if(game.joinCode) {
        view = 
            <>
                <h3>Join the game on your device with this code:</h3>
                <h1>{game.joinCode}</h1>
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