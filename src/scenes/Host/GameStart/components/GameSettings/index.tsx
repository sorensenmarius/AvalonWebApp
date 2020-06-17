import { Row, Col, Checkbox } from 'antd'
import React, { useState } from 'react'
import './index.less'
import PlayerRole from '../../../../../models/Players/playerRole'

const GameSettings = (props: any) => {
    const { game, evilCount } = props
    const [showGoodError, setShowGoodError] = useState(false);
    const [showEvilError, setShowEvilError] = useState(false);
    const goodRoles: string[]  = [];
    const evilRoles: string[] = [];
    
    const handleCheck = (e: any) => {
        // TODO - FIX BUG
        // First item added to list is somehow removed before the second item is added.
        // Subsequent items are added and removed from list correctly
        if(e.target.checked) {
            if(e.target.id <= 3) {
                goodRoles.push(e.target.id)
            } else {
                evilRoles.push(e.target.id)
            }
        } else {
            if(e.target.id <= 3) {
                goodRoles.splice(goodRoles.indexOf(e.target.id), 1)
            } else {
                evilRoles.splice(evilRoles.indexOf(e.target.id), 1)
            }
        }

        evilCount < evilRoles.length ? setShowEvilError(true) : setShowEvilError(false);
        game.players - evilCount < goodRoles.length ? setShowGoodError(true) : setShowGoodError(false);
    }

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
        </Row>
    )
}

export default GameSettings;