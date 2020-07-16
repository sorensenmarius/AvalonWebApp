import React, { } from 'react'
import { inject, observer } from 'mobx-react'
import { Col, Form, Input, Row, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { Game } from '../../../models/Game/game'
import Stores from '../../../stores/storeIdentifier'
import './index.less';


const JoinGame = (props: any) => {
    const history = useHistory();

    const join = async (values: any) => {
        var g: Game = await props.playerStore.createPlayer(values.name, values.joinCode);
        await props.gameStore.get(g.id);
        history.push("/playGame")
    }
    
    return(
        <Row  id = "bg" justify="center">
            <Col sm={16} lg={8}>
                <Form className = "Formen"
                    onFinish={join}>
                    <Form.Item
                        name="joinCode" 
                        className = "Formitems"
                    >
                        <div className ="InputContainer">
                            <img src="/images/orangejoin.png" alt="" width = "200px" />
                            <Input className="inputfield" placeholder="Join Code" />
                        </div>
                        
                    </Form.Item>
                    <Form.Item
                        name="name"    
                        className = "Formitems"

                    >
                        <div className = "InputContainer">
                            <img src="/images/Nickname.png" alt="" width = "200px" />
                            <Input className="inputfield" placeholder = "Nickname"/>
                        </div>
                        
                    </Form.Item>
                    <Row justify="center">
                        <Form.Item>
                            <Button id = "buttoninvis" type="primary" htmlType="submit">
                            <div id="realButton" className="button ros" >
                                <span className="content" >Join</span>
                            </div>
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Col>
        </Row>
    )
}

export default inject(Stores.GameStore)(inject(Stores.PlayerStore)(observer(JoinGame)))