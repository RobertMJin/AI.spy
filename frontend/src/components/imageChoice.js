import React from 'react';

const ImageChoice = ({imageNum, classification}) => {
    return (
        <div>
            <p>Image {imageNum}</p>
            <img/>
            <p>You think this is made by {classification}</p>
        </div>
    )
}