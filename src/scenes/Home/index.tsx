import React from 'react'
import { observer } from 'mobx-react'
import { Col, Button, Row } from 'antd'
import { useHistory } from 'react-router-dom'

const Home = (props: any) => {
    const history = useHistory();


    return(
        <Row justify="center">
            <Col>
                <Row>
                    <Button onClick={() => history.push("/createGame")}>Create Game</Button>
                </Row>
                <Row>
                    <Button onClick={() => history.push("/joinGame")}>Join Game</Button>
                </Row>
            </Col>
        </Row>
    )
}

export default observer(Home)