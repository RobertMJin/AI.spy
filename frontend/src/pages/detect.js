import React from "react";
import { useState } from "react";
import { useRef } from "react";

import arrow from '../assets/upload.png'

export default function Detect() {
    const [ uploadStyle, setUploadStyle ] = useState("text-slate-900 bg-slate-200 m-10 rounded-2xl border-cyan-900 border-[1rem] m-5 w-2/4 h-2/4 flex flex-col justify-items-center items-center cursor-pointer hover:scale-110");
    const [ image, setImage ] = useState(null);
    const hiddenInput = useRef(null);

    return (
        <div
            className="bg-gradient-to-b from-black to-cyan-900 w-full h-screen flex flex-col items-center"
            onPaste={(e) => {
                if (e.clipboardData.files.length) {
                    setImage(e.clipboardData.files[0])
                }
            }}>
            <h1
                className="font-compactRound text-white mt-10 mb-5 text-8xl"
            >Was this AI Art?</h1>
            <p className="text-white mb-5">Upload the image here and have our bot tell you.</p>
            <div
                className="text-slate-900 bg-slate-200 m-10 rounded-2xl border-cyan-900 border-[1rem] m-5 w-2/4 h-2/4 flex flex-col justify-items-center items-center cursor-pointer hover:scale-110 drop-shadow-xl hover:drop-shadow-2xl"
                onClick={() => hiddenInput.current.click()}>
                {image ? (<img alt="" className="relative w-full h-full object-contain" src={URL.createObjectURL(image)}></img>)
                : ( <div className="relative flex flex-col justify-items-center items-center">
                        <img src={arrow} className="h-1/2 m-5 hover:scale-110"></img>
                        <h1 className="text-4xl font-compactRound ">Paste or Upload Image</h1>
                    </div>)}
            </div>
            <input
                className="hidden"
                ref={hiddenInput}
                type="file"
                accept="image\png, image\jpeg, image\jpg, image\bmp"
                onChange={(e) => {
                    setImage(e.target.files[0])
                    e.target.value = ''
                }}
            >
            </input>
            <div
                disabled={image == null}
                class={image ? "drop-shadow-xl hover:drop-shadow-2xl font-compactRound m-5 text-black text-4xl w-1/4 h-20 bg-blue-200 p-4 rounded hover:cursor-pointer hover:scale-110" :
                    "drop-shadow-xl hover:drop-shadow-2xl font-compactRound m-5 text-black text-4xl w-1/4 h-20 bg-blue-200 p-4 mr-3 rounded"
                }
                onClick={() => setImage(null)}
            >Check Origin</div>
        </div>
    )
}