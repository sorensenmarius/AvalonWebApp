import React from 'react'
import { observer } from 'mobx-react'
import { Game } from '../../../../../models/Game/game'
import PlayerRole from '../../../../../models/Players/playerRole'

interface AssassinTurnProps {
    game: Game
}

const AssassinTurn = (props: AssassinTurnProps) => {
    const { game } = props

    const getAssassin = () => {
        return game.players.find(p => p.roleId === PlayerRole.Assassin)?.name
    }

    return(
        <h1>{getAssassin()} can assassinate a single good player</h1>
    )
}

export default observer(AssassinTurn)