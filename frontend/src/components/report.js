import React from 'react';

export default function Report() {
    const { image, setImage } = useState();


    return (
        <div>
            <h1>Spotted AI Art while scrolling?</h1>
            <p>Upload it here and we'll feed it to our model.</p>
            <input
                type='file'
                accept='image\png, image\jpeg, image\jpg, image\bmp'
                onChange={e => setImage(e.target.files[0])}
            >
                Upload
            </input>
            <button
                style={image ? {cursor: "pointer"} : {cursor: "not-allowed"}}
                onClick={setImage(null)}
            >Remove</button>
        </div>
    )
}