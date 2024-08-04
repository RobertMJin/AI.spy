import React from 'react'
import { useNavigate } from 'react-router-dom'
import play from './..\\assets\\Play.png'
import upload from './..\\assets\\XeZMLO.tif.png'
import report from './..\\assets\\Group 23.png'

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen bg-gradient-to-b from-black to-cyan-900 flex flex-col justify-items-center items-center">
            <h1 className="mt-10 mb-5 font-compactRound text-white text-8xl">AI.spy</h1>
            <h1 className="text-white font-compactRound text-2xl">Let’s keep it real: Using AI to identify AI-generated art.</h1>
            <div className="m-10 w-full h-2/4 flex flex-row justify-center items-center">
                <div
                    className="flex flex-col items-center m-3 p-5 basis-1/4 h-full rounded-2xl bg-sky-900 transform transition duration-200 hover:scale-110 cursor-pointer"
                    onClick={() => navigate('/detect')}
                >
                    <h1 className="text-white text-[2rem] font-compactRound w-full font-arial">AI Art Detector</h1>
                    <p className='text-white font-compactRound'>Submit art to check if it's AI</p>
                    <img className='h-2/3 mt-4 transform transition duration-200 hover:scale-110' src={upload}></img>
                </div>
                <div
                    className="flex flex-col items-center m-3 p-5 basis-1/3 h-full rounded-2xl bg-sky-200 border-8 border-sky-300 transform transition duration-200 hover:scale-110 cursor-pointer"
                    onClick={() => navigate('/lobby')}
                >
                    <h1 className="text-sky-950 text-[2rem] w-full font-compactRound">Play the Game</h1>
                    <p className='text-sky-950 font-compactRound'>Find the Art Imposter (AI)!</p>
                    <img className='h-2/3 mt-4 transform transition duration-200 hover:scale-110' src={play}></img>
                </div>
                <div
                    className="flex flex-col items-center m-3 p-5 basis-1/4 h-full rounded-2xl bg-sky-900 transform transition duration-200 hover:scale-110 cursor-pointer"
                    onClick={() => navigate('/report')}
                >
                    <h1 className="text-white text-[2rem] w-full font-arial font-compactRound">Report a Work</h1>
                    <p className='text-white font-compactRound'>Report something</p>
                    <img className='h-2/3 mt-4 transform transition duration-200 hover:scale-110' src={report}></img>
                </div>
            </div>
        </div>
    )
}