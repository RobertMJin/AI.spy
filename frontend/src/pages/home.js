import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="w-full h-full bg-gray-700 flex flex-col justify-items-center items-center">
            <h1 className="mt-10 mb-5 text-white text-8xl">AI.spy</h1>
            <h1 className="text-white text-2xl">Tagline here.</h1>
            <div className="m-10 w-full h-1/4 flex flex-row justify-center items-center">
                <div
                    className="p-20 basis-1/4 h-full rounded text-white text-4xl bg-gray-500 hover:bg-gray-600 cursor-pointer"
                    onClick={() => navigate('/detect')}
                >Detect
                </div>
                <div
                    className="p-20 m-3 basis-[] h-full rounded text-white text-4xl bg-gray-500 hover:bg-gray-600 cursor-pointer"
                    onClick={() => navigate('/lobby')}
                >Play
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