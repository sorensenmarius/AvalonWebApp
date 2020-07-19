import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { Col, Form, Input, Row, Button, notification } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import { Game } from '../../../models/Game/game'
import Stores from '../../../stores/storeIdentifier'
import './index.less';


const JoinGame = (props: any) => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if(location.state != null && location.state['kicked']) {
            notification.info({
                message: 'Kicked',
                description: 'You were kicked from the game by the host'
            })
        }
    })

    const join = async (values: any) => {
        if(parseInt(values.joinCode) === undefined || values.joinCode.length !== 6) {
            notification.info({
                message: 'JoinCode error',
                description: 'Invalid JoinCode. Must be 6 digit integer!'
            })
            return
        }
        var g: Game = await props.playerStore.createPlayer(values.name, values.joinCode);
        await props.gameStore.get(g.id);
        history.push("/playGame")
    }
    
    return(
        <Row  id = "bg" justify="center">
           {/*   <div id = "BackgroundContainer">
            </div>  */} 
            <Col sm={16} lg={8}>
                <Form className = "Formen"
                    onFinish={join}>
                    <Form.Item
                        name="joinCode" 
                        className = "Formitems"
                    >
                        <div className ="InputContainer">
                            <img src="/images/frozen4.png" alt="" width = "300px" />
                            <Input className="inputfield" placeholder="Join Code" />
                        </div>
                        
                    </Form.Item>
                    <Form.Item
                        name="name"    
                        className = "Formitems"

                    >
                        <div className = "InputContainer">
                            <img src="/images/fnick1.png" alt="" width = "300px" />
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