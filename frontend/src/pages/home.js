import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen bg-gray-700 flex flex-col justify-items-center items-center">
            <h1 className="mt-10 mb-5 text-white text-8xl">AI.spy</h1>
            <h1 className="text-white text-2xl">Tagline here.</h1>
            <div className="m-10 w-full h-2/4 flex flex-row justify-center items-center">
                <div
                    className="p-20 basis-1/4 h-full rounded text-white text-4xl bg-gray-500 hover:bg-gray-600 cursor-pointer"
                    onClick={() => navigate('/detect')}
                >Detect
                </div>
                <div
                    className="m-3 p-10 basis-1/3 h-full rounded-2xl bg-sky-200 hover:bg-sky-300 cursor-pointer"
                    onClick={() => navigate('/lobby')}
                >
                    <h1 className="text-sky-950 text-[2rem] w-full font-arial">Play the Game</h1>
                    <p>Find the Art Imposter (AI)!</p>
                </div>
                <div
                    className="p-20 basis-1/4 h-full rounded text-white text-4xl bg-gray-500 hover:bg-gray-600 cursor-pointer"
                    onClick={() => navigate('/report')}>
                Report
                </div>
            </div>
        </div>
    )
}