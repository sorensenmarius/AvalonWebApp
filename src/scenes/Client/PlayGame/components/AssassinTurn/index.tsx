import React, { useState } from 'react'
import { observer, inject } from 'mobx-react'
import { Player } from '../../../../../models/Players/player'
import PlayerRole from '../../../../../models/Players/playerRole'
import { Row, Checkbox, Button } from 'antd'
import { Game } from '../../../../../models/Game/game'
import Stores from '../../../../../stores/storeIdentifier'
import GameStore from '../../../../../stores/gameStore'

interface AssassinTurn {
    me: Player
    game: Game
    gameStore?: GameStore
}

const AssassinTurn = (props: AssassinTurn) => {
    const { me, game, gameStore } = props
    const [picked, setPicked] = useState<string>("")

    const checkedPlayer = (id: string) => {
        if(picked === id) {
            setPicked("")
        } else {
            setPicked(id)
        }
    }

    const assassinate = async () => {
        await gameStore?.assassinate(game.id, picked)
    }

    if(me.roleId === PlayerRole.Assassin) {
        return(
            <React.Fragment>
            <h1>Choose Merlin</h1>
            {game.players.filter((p: Player) => !p.isEvil).map((p: Player) => 
                <Row justify="center" key={p.id}>
                    <Checkbox 
                        onChange={() => checkedPlayer(p.id)}
                        checked={picked === p.id}
                    >
                        {p.name}
                    </Checkbox>
                </Row>
            )}
            <Row>
                <Button
                    onClick={assassinate}
                    disabled={picked === ""}
                >
                    Kill
                </Button>
            </Row>
            </React.Fragment>
        )
    } else {
        return(<h1>TESTESTSTST</h1>)
    }
}

export default inject(Stores.GameStore)(observer(AssassinTurn))