import { Row, Col, Checkbox, Button } from 'antd'
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
        if(e.target.checked) {
            if(e.target.id <= 3) {
                setGoodRoles([...goodRoles, e.target.id])
            } else {
                setEvilRoles([...evilRoles, e.target.id])
            }
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
        await gameStore.startGame(game.id, [...goodRoles, ...evilRoles], 2)
        history.push("/host")
    }

    useEffect(() => {
        evilCount < evilRoles.length ? setShowEvilError(true) : setShowEvilError(false);
        game.players.length - evilCount < goodRoles.length ? setShowGoodError(true) : setShowGoodError(false);
    })

    const roles = Object.keys(PlayerRole).map(key => PlayerRole[key]).filter(value => typeof value === 'string') as string[];
    const rolesHTML =  roles.map((role, index) => (<Row key={index}><Checkbox id={""+index} onChange={handleCheck}>{role}</Checkbox></Row>));

    return(
        <Row justify="center" className="centerContent">
            <Col span={24}>
                <h2>Settings:</h2>
            </Col>  
            <Col span={12}>
                <h3>Good roles:</h3>
                <Row>
                    <Col span={6} offset={10}>
                        {rolesHTML.slice(2, 4)}
                    </Col>
                </Row>
                {(() => {
                    if(showGoodError) {
                        return(
                            <span>You can choose a maximum of {game.players.length - evilCount} good roles!</span>
                        )
                    }
                    return null;
                })()}
            </Col>
            <Col span={12}>
                <h3>Evil roles:</h3>
                <Row>
                    <Col span={6} offset={10}>
                        {rolesHTML.slice(5, 9)}
                    </Col>
                </Row>
                {(() => {
                    if(showEvilError) {
                        return(
                            <span>You can choose a maximum of {evilCount} evil roles!</span>
                        )
                    }
                    return null;
                })()}
            </Col>
            <Button onClick={startGame}>Start Game</Button>
        </Row>
    )
}

export default inject(Stores.GameStore)(observer(GameSettings));