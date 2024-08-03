import React from 'react'
import { useState, useRef , useEffect } from 'react'
import LobbyProfile from '../lobbyProfile'

const Canvas = ({canvasSize}) => {
    const [isDrawing, setIsDrawing] = useState(false)
    const [brushSize, setBrushSize] = useState(5)
    const [colour, setColour] = useState("black")
    
    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = canvasSize * 2
        canvas.height = canvasSize * 2
        canvas.style.width = `${canvasSize}px`;
        canvas.style.height = `${canvasSize}px`;

        const context = canvas.getContext("2d")
        context.scale(2,2)
        context.lineCap = "round"
        context.strokeStyle = "black"
        context.lineWidth = brushSize
        contextRef.current = context
    }, [])

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.lineWidth = brushSize
            contextRef.current.strokeStyle = colour
        }
    }, [brushSize, colour]);

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
        <div className=''>
            <div className={`w-[640px] h-[640px] bg-cover bg-center absolute z-10`}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
            />
            <canvas 
                className={`w-[${canvasSize}px] h-[${canvasSize}px] border-8 box-border border-black rounded-[50px] bg-gray-100`}
                ref={canvasRef}
            />
            <div className='flex'>
                <button onClick={() => setBrushSize(1)} className="m-4 text-white">.</button>
                <button onClick={() => setBrushSize(5)} className="m-4 text-white">o</button>
                <button onClick={() => setBrushSize(15)} className="m-4 text-white">O</button>
                <button onClick={() => setColour("black")} className="m-4 text-white">black</button>
                <button onClick={() => setColour("red")} className="m-4 text-white">red</button>
                <button onClick={() => setColour("blue")} className="m-4 text-white">blue</button>
                <button onClick={() => setColour("yellow")} className="m-4 text-white">yellow</button>
                <button onClick={() => setColour("green")} className="m-4 text-white">green</button>
                <button onClick={clearCanvas} className="m-4 text-white">clear</button>
            </div>
        </div>
    )
}

export default Canvas