import React from 'react'
import { useState, useRef , useEffect } from 'react'
import LobbyProfile from './lobbyProfile'
import Canvas from './canvas'

const Lobby = () => {
    const [numPlayers, setNumPlayers] = useState(1)
    return (
        <div className="flex">
            <div className="flex flex-col items-center m-16 w-[40vw]">
                <h1>Player {numPlayers}/4</h1>
                <LobbyProfile isHost={true}/>
            </div>
            <div className="flex flex-col justify-center items-center w-[60vw] m-16 p-8">
                <Canvas canvasSize={640} />
                <div className="flex">
                    <button className="m-4">Invite</button>
                    <button className="m-4">Start</button>
                </div>
            </div>
        </div>
    )
}

export default Lobby