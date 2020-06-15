import React, { useEffect, useState } from 'react'
import WaitingForPlayers from './components/WaitingForPlayers'
import { HubConnectionBuilder } from '@aspnet/signalr';
import { inject, observer } from 'mobx-react';
import Stores from '../../stores/storeIdentifier';
import AppConsts from '../../lib/appconst';

const PlayGame = (props: any) => {
    const [game, setGame] = useState(props.gameStore.currentGame)
    
    useEffect(() => {
        (async () => {
            await initSocket();
        })();
    }, [])

    useEffect(() => {
        setGame(props.gameStore.currentGame)
    })

    const initSocket = async () => {
        const connect = new HubConnectionBuilder()
            .withUrl(AppConsts.remoteServiceBaseUrl + '/gameHub')
            .build()

        try {
            await connect.start()
            connect.invoke("JoinGameGroup", game.id)
        } catch(err) {
            console.log(err)
        }
        connect.on("GameUpdated", function() {
            console.log("Game was updated")
            props.gameStore.get(game.id);
        })
    }


    return (
        <WaitingForPlayers game={game}/>
    )
}

export default inject(Stores.GameStore)(inject(Stores.PlayerStore)(observer(PlayGame)));
