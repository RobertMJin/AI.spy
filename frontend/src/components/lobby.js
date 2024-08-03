import React from 'react'
import { useState, useRef , useEffect } from 'react'
import LobbyProfile from './lobbyProfile'

const Lobby = () => {
    const [numPlayers, setNumPlayers] = useState(1)
    const [isDrawing, setIsDrawing] = useState(false)
    const [brushSize, setBrushSize] = useState(5)
    
    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = 1280;
        canvas.height = 1280;
        canvas.style.width = `640px`;
        canvas.style.height = `640px`;

        const context = canvas.getContext("2d")
        context.scale(2,2)
        context.lineCap = "round"
        context.strokeStyle = "black"
        context.lineWidth = brushSize
        contextRef.current = context
    }, [])

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.lineWidth = brushSize;
        }
    }, [brushSize]);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)
    }
    

    return (
        <div className="flex">
            <div className="flex flex-col items-center m-16 w-[40vw]">
                <h1>Player {numPlayers}/4</h1>
                <LobbyProfile isHost={true}/>
            </div>
            <div className="flex flex-col justify-center items-center w-[60vw] m-16 p-8">
                <canvas 
                    className="w-[640px] h-[640px] border-black border-8"
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                />
                <div className='flex'>
                    <button onClick={() => setBrushSize(1)} className="m-4">.</button>
                    <button onClick={() => setBrushSize(5)} className="m-4">o</button>
                    <button onClick={() => setBrushSize(15)} className="m-4">O</button>
                    <button onClick={clearCanvas} className="m-4">clear</button>
                </div>
                <div className="flex">
                    <button className="m-4">Invite</button>
                    <button className="m-4">Start</button>
                </div>
            </div>
        </div>
    )
}

export default Lobby