import React from 'react'
import { useState } from 'react'

const LobbyProfile = ({isHost}) => {
    const [pfp, setPfp] = useState("https://www.thesprucecrafts.com/thmb/doYzRzmTVm-2ANCm0gtbHu0GaPU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9-56a810973df78cf7729bd058.png")
    const [username, setUsername] = useState("test")

    return (
        <div className="flex relative w-64 h-24, border-8 items-center p-2 m-2">
            <div className="flex justify-center items-center h-16 w-16 rounded-full border-4">
                <img src={pfp} className="h-full" />
            </div>
            <h1 className="ml-2">{username}</h1>
            {isHost ? <img className="h-16 absolute right-0" src='https://www.creativefabrica.com/wp-content/uploads/2022/08/02/Floating-Crown-Cartoon-Icon-Graphics-35349477-2-580x435.png'/> : null}
        </div>
    )
}

export default LobbyProfile