import React from 'react'
import { observer } from 'mobx-react'
import { Col, Row } from 'antd'
import './index.less'
import { useHistory } from 'react-router-dom'

const Home = (props: any) => {
    const history = useHistory();

    const handleHost = () => {
        var t = document.getElementById("HomeScreen");
    // Add the fader class to the target.
        if(t){
            var string = t.className;
            t.className = string + " fader";
        }   
        setTimeout(() => {
            history.push("/host");
        }, 1000);
    }
    const handleClient = () => {
        var t = document.getElementById("HomeScreen");
    // Add the fader class to the target.
        if(t){
            var string = t.className;
            t.className = string + " fader";
        }   
        setTimeout(() => {
            history.push("/play");
        }, 1000);
    }

    return(
        <Row id = "HomeScreen" justify="center" >
            <div id = "buttonContainer">
                <Col>
                    <Row>
                    <div className="button ros">
                        <span className="content" onClick={() => handleHost()}>Create Game</span>
                    </div>
                    </Row>
                    <Row>
                    <div className="button ros">
                        <span className="content" onClick={() => handleClient()}>Join Game</span>
                    </div>                    
                    </Row>
                </Col>
            </div>
            <div id = "Title">
                <Row justify="center"> 
                    <h1 id = "AvalonText">Avalon</h1>
                </Row>
            </div>
        </Row>
    )
}

export default observer(Home)