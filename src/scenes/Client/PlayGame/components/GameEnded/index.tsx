import React from 'react'
import { observer } from 'mobx-react'

const GameEnded = () => {
    return(
        <React.Fragment>
            <h1>The Game has ended.</h1>
            <h2>Thanks for playing!</h2>
        </React.Fragment>
    )
}

export default observer(GameEnded)