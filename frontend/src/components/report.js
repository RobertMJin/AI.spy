import React from "react";
import { useState } from "react";
import { useRef } from "react";

export default function Report() {
    const { image, setImage } = useState(null);
    const hiddenInput = useRef(null);

    return (
        <div className="flex-col">
            <h1
                className="text-4xl"
            >Spotted AI Art while scrolling?</h1>
            <p>Upload it here and we'll feed it to our model.</p>
            <div
                className="flex-col w-50 h-50 border-slate-500 cursor-pointer"
                onPaste={(e) => {
                    if (image !== null && e.clipboardData.files.length) {
                        setImage(e.clipboardData.files[0])
                    }
                }}
                onClick={() => hiddenInput.current.click()}
            >
                Paste or Upload Image
            </div>
            <input
                style={{display: "none"}}
                ref={hiddenInput}
                type="file"
                accept="image\png, image\jpeg, image\jpg, image\bmp"
                onChange={e => setImage(e.target.files[0])}
            >
            </input>
            <button
                style={image ? {cursor: "pointer"} : {cursor: "not-allowed"}}
                onClick={() => setImage(null)}
            >Remove</button>
        </div>
    )
}