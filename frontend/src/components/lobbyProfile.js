import React from 'react'
import { useState } from 'react'

const LobbyProfile = ({ user }) => {
    return (
        <div className="flex relative w-[256px] h-[80px] border-8 rounded-3xl bg-white border-black bg-contain bg-center items-center p-2 m-2">
            <div className="flex justify-center items-center h-14 w-14 ml-2 rounded-full border-4 border-black">
                <img src={user.picture} className="h-full" />
            </div>
            <div className="flex flex-col jsutify-center items-center">
                <h1 className="ml-2">{user.username}</h1>
                <h1 className='ml-2'>{user.email}</h1>
            </div>
            {false ? <img className="h-16 absolute right-0" src='https://www.creativefabrica.com/wp-content/uploads/2022/08/02/Floating-Crown-Cartoon-Icon-Graphics-35349477-2-580x435.png'/> : null}
        </div>
    )
}

export default LobbyProfile