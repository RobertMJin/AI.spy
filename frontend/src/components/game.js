import React from 'react';
import { useState } from 'react';
import ImageChoice from './imageChoice';

const Game = () => {
    const [selectedImg, setSelectedImg] = useState(0)

    return (
        <div className='flex flex-col bg-gray-700 items-center'>
            <h1 className='text-white text-[48px]   '>Choose the image you think is AI generated.</h1>
            <div className='flex items-center w-full'>
                <div className='w-1/3 relative m-8' onClick={() => {selectedImg === 1 ? setSelectedImg(0) : setSelectedImg(1)}}>
                    <ImageChoice 
                        imageNum={'1'} isSelected={selectedImg === 1} source={"https://yt3.ggpht.com/ytc/AIdro_mk2Ex-8sW03SBlBX7D1EC5skH0kv9rS3rU9IXq2I-q2Zg=s48-c-k-c0x00ffffff-no-rj"} 
                    />
                </div>
                <div className='w-1/3 relative m-8' onClick={() => {selectedImg === 2 ? setSelectedImg(0) : setSelectedImg(2)}}>
                    <ImageChoice 
                        imageNum={'2'} isSelected={selectedImg === 2} source={"https://naturedestinations.ca/wp-content/uploads/2019/07/Old-Man-1-1100-600x403.jpg"}
                    />
                </div>
                <div className='w-1/3 relative m-8' onClick={() => {selectedImg === 3 ? setSelectedImg(0) : setSelectedImg(3)}}>
                    <ImageChoice 
                        imageNum={'3'} isSelected={selectedImg === 3} source={"https://www.thesprucecrafts.com/thmb/doYzRzmTVm-2ANCm0gtbHu0GaPU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9-56a810973df78cf7729bd058.png"}
                    />
                </div>
            </div>
            <button className='text-white text-[48px] bg-blue-400 p-3 rounded-xl cursor-pointer w-[256px] transform transition duration-500 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100' disabled={selectedImg === 0}>Choose</button>
        </div>
    )
}

export default Game