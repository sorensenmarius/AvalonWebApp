import React from 'react'
import { inject, observer } from 'mobx-react'
import { Col, Form, Input, Row, Button } from 'antd'
import Stores from '../../stores/storeIdentifier'
import { Game } from '../../models/Game/game'
import { useHistory } from 'react-router-dom'

const JoinGame = (props: any) => {
    const history = useHistory();

    const join = async (values: any) => {
        var g: Game = await props.playerStore.createPlayer(values.name, values.joinCode);
        await props.gameStore.get(g.id);
        history.push("/playGame")
    }


    return(
        <Row justify="center">
            <Col sm={16} lg={8}>
                <Form
                    onFinish={join}>
                    <Form.Item
                        label="Join Code"
                        name="joinCode"    
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Nickname"
                        name="name"    
                    >
                        <Input />
                    </Form.Item>
                    <Row justify="center">
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Join
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Col>
        </Row>
    )
}

export default inject(Stores.GameStore)(inject(Stores.PlayerStore)(observer(JoinGame)))