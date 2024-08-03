import React from 'react';
import { useState } from 'react';
import ImageChoice from './imageChoice';

const Game = () => {
    const [selectedImg, setSelectedImg] = useState(0)

    return (
        <div>
            <div onClick={() => {setSelectedImg(1)}}>
                <ImageChoice 
                    imageNum={'1'} isAI={selectedImg === 1} source={"https://yt3.ggpht.com/ytc/AIdro_mk2Ex-8sW03SBlBX7D1EC5skH0kv9rS3rU9IXq2I-q2Zg=s48-c-k-c0x00ffffff-no-rj"} 
                />
            </div>
            <div onClick={() => {setSelectedImg(2)}}>
                <ImageChoice imageNum={'2'} isAI={selectedImg === 2}
                />
            </div>
            <div onClick={() => {setSelectedImg(3)}}>
                <ImageChoice imageNum={'3'} isAI={selectedImg === 3}
                />
            </div>
        </div>
    )
}

export default Game