import React, { useState, useEffect } from 'react';
import { Row, Col, List, Tag } from 'antd';
import { inject, observer } from 'mobx-react';
import Stores from '../../../stores/storeIdentifier';
import './index.less';
import { Player } from '../../../models/Players/player';
import GameSettings from './components/GameSettings';
import { Game } from '../../../models/Game/game';

const GameStart = (props: any) => {
    const [game, setGame] = useState<Game>(props.gameStore.currentGame);

    useEffect(() => {
        setGame(props.gameStore.currentGame);
    }, [props.gameStore.currentGame])

    const removePlayer = (id: string) => {
        console.log(id)
        props.gameStore.removePlayer(game.id, id)
    }

    return(
        <Row id = "main" justify="center">
            <div id= "Backgroundtest"></div>
            <Col sm={24}>
                <Row justify="center" className="createGameView">
                    <Col id = "PlayerJoin">
                        <h3>Join the game on your device with this code:</h3>
                        <h1>{game.joinCode}</h1>
                        <h3>Current Players:</h3>
                        <List
                            style={{
                                minWidth: '700px'
                            }}
                            grid={{ gutter: 16, column: 4 }}
                            dataSource={game.players} 
                            locale={{
                                emptyText: (
                                    <>
                                        <h4>No players have joined yet</h4>
                                    </>
                                )
                            }}
                            renderItem={(player: Player) => (
                                <List.Item>
                                    <Tag 
                                        color='processing'
                                        closable={true}
                                        onClose={() => removePlayer(player.id)}
                                    >
                                        {player.name}
                                    </Tag>
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
                <GameSettings game={ game } />
            </Col>
        </Row>
    )
}

export default inject(Stores.GameStore)(observer(GameStart));