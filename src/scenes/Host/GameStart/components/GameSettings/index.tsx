import { Row, Col, Card, notification } from 'antd'
import React, { useState, useEffect } from 'react'
import './index.less'
import PlayerRole from '../../../../../models/Players/playerRole'
import { observer, inject } from 'mobx-react'
import Stores from '../../../../../stores/storeIdentifier'
import { Game } from '../../../../../models/Game/game'
import GameStore from '../../../../../stores/gameStore'
import { useHistory } from 'react-router-dom'

interface GameSettingsProps {
    game: Game
    gameStore?: GameStore
}

const GameSettings = (props: GameSettingsProps) => {
    const { game, gameStore } = props
    const [showGoodError, setShowGoodError] = useState(false);
    const [showEvilError, setShowEvilError] = useState(false);
    const [goodRoles, setGoodRoles] = useState<string[]>([])
    const [evilRoles, setEvilRoles] = useState<string[]>([])
    const [evilCount, setEvilCount] = useState(0);

    const history = useHistory();

    useEffect(() => {
        (async () => {
            if(game.players.length >= 5) {
                let n = await gameStore?.getHowManyEvil(game.players.length);
                setEvilCount(n ? n : 0);
            };
        })();
    }, [game.players, gameStore])

    useEffect(() => {
        if(game.players.length > 4) {
            evilCount < evilRoles.length ? setShowEvilError(true) : setShowEvilError(false);
            game.players.length - evilCount < goodRoles.length ? setShowGoodError(true) : setShowGoodError(false);
        }
    }, [game.players.length, evilCount, evilRoles.length, goodRoles.length])
    
    const handleCheck = (e: any) => {
        if(e.target.className === "fadein") e.target.className = "fade";
        else e.target.className = "fadein";
        if(!goodRoles.includes(e.target.id)&&!evilRoles.includes(e.target.id)) {
            if(e.target.id <= 3) {
                setGoodRoles([...goodRoles, e.target.id])
            } else {
                setEvilRoles([...evilRoles, e.target.id])
            }
        } else {
            console.log("Removing??")
            if(e.target.id <= 3) {
                let GR = [...goodRoles]
                GR.splice(GR.findIndex(r => r === e.target.id), 1)
                setGoodRoles(GR)
            } else {
                let ER = [...evilRoles]
                ER.splice(ER.findIndex(r => r === e.target.id), 1)
                setEvilRoles(ER)
            }
        }
    }

    const startGame = async () => {
        if(showGoodError || showEvilError) {
            notification.error({
                message: 'Incorrect settings!',
                description: `You can choose a maximum of ${game.players.length - evilCount} good roles and ${evilCount} evil roles!`
            })
            return
        }
        if(game.players.length < 5) {
            notification.error({
                message: 'Incorrect settings!',
                description: 'You need a minimum of 5 players',
                duration: 20
            })
            return
        }
        await gameStore?.startGame(game.id, [...goodRoles, ...evilRoles])
        history.push("/host")
    }
    var array = [
        {RoleId: 2, ImageSrc: "/images/Merlin.png"},
        {RoleId: 3, ImageSrc: "/images/Percival.png"},
        {RoleId: 5, ImageSrc: "/images/Morgana.png"},
        {RoleId: 6, ImageSrc: "/images/Mordred.png"},
        {RoleId: 7, ImageSrc: "/images/Assassin.png"},
        {RoleId: 8, ImageSrc: "/images/Oberon.png"},
    ]

    const roles = Object.keys(PlayerRole).map(key => PlayerRole[key]).filter(value => typeof value === 'string') as string[];
   // const rolesHTML =  roles.map((role, index) => (<Row key={index}><Checkbox id={""+index} onChange={handleCheck}>{role}</Checkbox></Row>));
    const rolesHTML =  roles.map((role, index) => (
        <Row key={index} >
        <div  onClick={handleCheck} style = {{marginBottom: 20, borderRadius: 20}} > 
            <Card 
                className = "Cards"
                hoverable
                loading
                style={{ width: 150, height: 200}}
                cover={<img id = {index.toString()} width="150" height="200" className = "fade" alt="example" src={array.find(role => role.RoleId === index)?.ImageSrc} />}
            >  
            </Card>
        </div>
    </Row>));


    return(
        <Row justify="center" className="centerContent" >
            <div id = "BackgroundContainer">
            </div>     
            <Col span={24}>
                <h2>Click on an image to add the Role to the Game:</h2>
            </Col>  
            <Col span={8} className ="Cols">
                <Row >
                    <Col span={8} offset={16} >
                        {rolesHTML.slice(2, 4)}
                    </Col>
                </Row>
                {(() => {
                    if(showGoodError) {
                        return(
                            <span  className = "RedSpan">You can choose a maximum of {game.players.length - evilCount} good roles!</span>
                        )
                    }
                    return null;
                })()}
            </Col>
            <Col span={16} className ="Cols">
                <Row  justify = "center">
                    <Col span={8} offset={0} className="EvilCols" >
                        {rolesHTML.slice(5, 7)}
                    </Col>
                    <Col span={8} offset={0} >
                        {rolesHTML.slice(7, 9)}
                    </Col>
                </Row>
                {(() => {
                    if(showEvilError) {
                        return(
                            <span className = "RedSpan">You can choose a maximum of {evilCount} evil roles!</span>
                        ) 
                    }
                    return null;
                })()}
            </Col>
            <div id="GodButton" className="button ros">
                <span className="content" onClick={startGame} >Start Game</span>
            </div>     
        </Row>
    )
}

export default inject(Stores.GameStore)(observer(GameSettings));