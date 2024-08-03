import React from 'react'

const ImageChoice = ({imageNum, source, isSelected}) => {

    return (
        <div className={`${isSelected ? 'border-blue-500' : 'border-white'} flex-col flex items-center relative border-8 h-[60vh] rounded-[50px] py-2 px-4 cursor-pointer transform transition duration-500 hover:scale-110`}>
            <p className={`${isSelected ? 'text-blue-500' : 'text-white'} transform transition duration-500 text-[24px]`}>Image {imageNum}</p>
            <img className='h-3/4 rounded-3xl mt-2' src={source} alt="" />
            <p className={`${isSelected ? 'text-opacity-100' : 'text-opacity-0'} transform transition duration-500 absolute w-full bottom-4 text-blue-500`}>I think this is made by AI.</p>
        </div>
    )
}

export default ImageChoice