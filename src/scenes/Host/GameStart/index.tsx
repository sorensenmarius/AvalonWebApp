import React, { useState, useEffect } from 'react';
import { Row, Col, List } from 'antd';
import { inject, observer } from 'mobx-react';
import Stores from '../../../stores/storeIdentifier';
import './index.less';
import { Player } from '../../../models/Players/player';
import GameSettings from './components/GameSettings';

const GameStart = (props: any) => {
    const [evilCount, setEvilCount] = useState(0);
    const [game, setGame] = useState(props.gameStore.currentGame);

    useEffect(() => {
        setGame(props.gameStore.currentGame);
    }, [props.gameStore.currentGame])

    useEffect(() => {
        (async () => {
            if(game.players.length >= 5) {
                let n = await props.gameStore.getHowManyEvil(game.players.length);
                setEvilCount(n);
            };
        })();
    }, [game])

    return(
        <Row id = "main" justify="center">
            <Col sm={24}>
                <Row justify="center" className="createGameView">
                    <Col>
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
                            )}
                        />
                    </Col>
                </Row>
                <GameSettings game={ game } evilCount={evilCount} />
            </Col>
        </Row>
    )
}

export default inject(Stores.GameStore)(observer(GameStart));