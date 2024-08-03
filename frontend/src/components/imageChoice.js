import React from 'react'

const ImageChoice = ({imageNum, source, isAI}) => {

    return (
        <div className='bg-blue-500 m-8'>
            <p>Image {imageNum}</p>
            <img src={source} alt="" />
            {isAI ? <p>You think this is made by AI.</p> : null}
        </div>
    )
}

export default ImageChoice