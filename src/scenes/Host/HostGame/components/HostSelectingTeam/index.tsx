import React, { useEffect } from 'react'
import {observer } from 'mobx-react';
import { Game } from '../../../../../models/Game/game';
import { Row, Col, List } from 'antd';
import { Player } from '../../../../../models/Players/player';
import './index.less';


interface HostSelectingTeamProps {
    game: Game
}


const HostSelectingTeam = (props: HostSelectingTeamProps) => {
    const { game } = props;

    useEffect(() => {
        RotateImage()
      }, [game.currentRound.currentTeam] 
      ); 

    const RotateImage = () => {
        var NameTagRow = document.getElementsByClassName("NameTagRow");
            for(var i = 0; i < NameTagRow.length; i++)
            {
                let randomNmr = Math.floor(Math.random() * 20)-10; 

                console.log(randomNmr + " angle")
                NameTagRow[i].setAttribute("style", "-moz-transform:rotate("+ randomNmr+"deg);")
                NameTagRow[i].setAttribute("style", "-webkit-transform:rotate("+ randomNmr+"deg)")
                console.log("DOne dat shiat")
            }
    }

    return(
        <Row
            justify="center"
        >
            <Col>
                <h1 className="header">{ game.currentPlayer.name } is picking a team of {game.currentRound.requiredPlayers}!</h1>
                <h3>Current Players:</h3>
                <List
                className = "ItemList"
                    grid={{
                        gutter: 0,
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 1,
                        xl: 1,
                        xxl: 1}}
                    dataSource={game.currentRound.currentTeam} 
                    renderItem={(player: Player) => (
                        <List.Item>
                                <Row justify = "center"  >
                                    <div className ="NameTagRow">
                                    <span className = "PlayerName">{player.name}</span> 
                                    </div>
                                </Row>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
}

export default observer(HostSelectingTeam);
