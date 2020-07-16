import { Row, Col, Card } from 'antd'
import React, { useState, useEffect } from 'react'
import './index.less'
import PlayerRole from '../../../../../models/Players/playerRole'
import { observer, inject } from 'mobx-react'
import Stores from '../../../../../stores/storeIdentifier'
import { Game } from '../../../../../models/Game/game'
import GameStore from '../../../../../stores/gameStore'
import { useHistory } from 'react-router-dom'

const GameSettings = (props: any) => {
    const { game, evilCount, gameStore }: {game: Game, evilCount: number, gameStore: GameStore} = props
    const [showGoodError, setShowGoodError] = useState(false);
    const [showEvilError, setShowEvilError] = useState(false);
    const [goodRoles, setGoodRoles] = useState<string[]>([])
    const [evilRoles, setEvilRoles] = useState<string[]>([])
    const history = useHistory();
    
    const handleCheck = (e: any) => {
        // TODO - FIX BUG
        // First item added to list is somehow removed before the second item is added.
        // Subsequent items are added and removed from list correctly
        if(e.target.className == "fadein") e.target.className = "fade";
        else e.target.className = "fadein";
        if(!goodRoles.includes(e.target.id)) {
            console.log("Test");
            if(e.target.id <= 3) {
                setGoodRoles([...goodRoles, e.target.id])
            } else {
                setEvilRoles([...evilRoles, e.target.id])
            }
            console.log(evilRoles.length);

        } else {
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
        let minions = evilCount - evilRoles.length
        await gameStore.startGame(game.id, [...goodRoles, ...evilRoles], minions)
        history.push("/host")
    }
    var array = [
        {RoleId: 2, ImageSrc: "https://usercontent1.hubstatic.com/13012388_f520.jpg"},
        {RoleId: 3, ImageSrc: "https://nagas1.com/%D7%99%D7%A8%D7%A7%D7%95%D7%9F/%D7%9E%D7%97%D7%96%D7%95%D7%A8%202014/%D7%9B%D7%99%D7%AA%D7%94%20%D7%97/%D7%9E%D7%A9%D7%94%D7%95%20%D7%A7%D7%A6%D7%AA%20%D7%A9%D7%95%D7%A0%D7%94/ohad/img/bvb.jpg"},
        {RoleId: 5, ImageSrc: "https://i.imgur.com/NtzlpDs.png"},
        {RoleId: 6, ImageSrc: "https://www.regledujeu.fr/wp-content/uploads/mordred.jpg"},
        {RoleId: 7, ImageSrc: "https://usercontent2.hubstatic.com/13012389_f520.jpg"},
        {RoleId: 8, ImageSrc: "https://www.regledujeu.fr/wp-content/uploads/oberon.jpg"},
    ]

    useEffect(() => {
        evilCount < evilRoles.length ? setShowEvilError(true) : setShowEvilError(false);
        game.players.length - evilCount < goodRoles.length ? setShowGoodError(true) : setShowGoodError(false);
    })

    const roles = Object.keys(PlayerRole).map(key => PlayerRole[key]).filter(value => typeof value === 'string') as string[];
   // const rolesHTML =  roles.map((role, index) => (<Row key={index}><Checkbox id={""+index} onChange={handleCheck}>{role}</Checkbox></Row>));
    const rolesHTML =  roles.map((role, index) => (<Row key={index} >
    <div onClick={handleCheck} style = {{marginBottom: 20, borderRadius: 20}} > 
    <Card 
    className = "Cards"
    hoverable
    loading
    style={{ width: 150, height: 200}}
    cover={<img width="100" height="200" className = "fade" alt="example" src={array.find(role => role.RoleId === index)?.ImageSrc} />}
    >  
    </Card>
    </div>
    </Row>));


    return(
        <Row justify="center" className="centerContent" >
            <Col span={24}>
                <h2>Settings:</h2>
            </Col>  
            <Col span={12} className ="Cols">
                <h3>Good roles:</h3>
                <Row >
                    <Col span={4} offset={10} >
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
            <Col span={12} className ="Cols">
                <h3>Evil roles:</h3>
                <Row  justify = "center">
                    <Col span={6} offset={3} >
                        {rolesHTML.slice(5, 7)}
                    </Col>
                    <Col span={6} offset={3} >
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