import React from "react";
import { useState } from "react";
import { useRef } from "react";

import arrow from '../upload.png'

export default function Report() {
    const [ image, setImage ] = useState(null);
    const hiddenInput = useRef(null);
    // const [ sus, setSus ] = useState(true);

    return (
        <div
            className="w-screen h-screen bg-gray-700 flex flex-col items-center"
            onPaste={(e) => {
                if (e.clipboardData.files.length) {
                    setImage(e.clipboardData.files[0])
                }
            }}>
            <h1
                className="text-white mt-10 text-4xl"
            >Spotted AI Art while scrolling?</h1>
            <p className="text-white">Upload it here and we'll feed it to our model.</p>
            <div
                className={
                    image
                    ? "text-slate-500 bg-slate-300 p-10 rounded m-10 flex flex-col justify-items-center items-center border-solid border-2 border-slate-400" 
                    : "text-slate-500 bg-slate-300 p-10 rounded m-10 flex flex-col justify-items-center items-center border-solid border-2 border-slate-400 cursor-pointer"
                }
                onClick={() => hiddenInput.current.click()}
            >
                {image ? (<img alt="" className="object-contain" src={URL.createObjectURL(image)}></img>)
                : ( <div className="relative flex flex-col justify-items-center items-center">
                        <img src={arrow} className="size-20"></img>
                        <p>Paste or Upload Image</p>
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
            <div className="relative flex flex-row justify-items-center items-center">
                <div
                    disabled={image == null}
                    class={image ? "basis-1/2 text-white bg-blue-400 p-3 mx-3 rounded hover:cursor-pointer hover:bg-blue-500" :
                        "text-white bg-blue-400 p-3 mx-3 rounded"
                    }
                    onClick={() => setImage(null)}
                >Submit</div>
                <div
                    disabled={image == null}
                    class={image ? "basis-1/2 text-white bg-red-400 p-3 mx-3 rounded hover:cursor-pointer hover:bg-red-500" :
                        "text-white bg-red-400 p-3 mx-3 rounded"
                    }
                    onClick={() => setImage(null)}
                >Remove</div>
            </div>
        </div>
    )
}