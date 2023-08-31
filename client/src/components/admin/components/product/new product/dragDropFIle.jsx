import { useState, useRef } from 'react';

function DragDropFile() {
    const [files, setFiles] = useState();
    const inputRef = useRef();
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleDrop = (e) => {
        e.preventDefault();
        console.log(e.dataTransfer)
        // setFiles(e.dataTransfer.files);
    };

if( files) return (
    <div className='uploads'>
        <ul className='img-grid'>
            {Array.from(files).map((file, idx) => <li key={idx}><img src={URL.createObjectURL(file)} className="object-contain w-full h-full" alt="" /></li>)}
        </ul>
    </div>
)

    return (
        <section>
            {!files && (
                <div
                    className="dropzone"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <h1>Drag and Drop FIles to Upload</h1>
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setFiles(e.target.files)}
                        hidden
                        accept="image/png, image/jpeg"
                        ref={inputRef}
                    />
                    <button type="button" onClick={() => inputRef.current.click()}>
                        Select Photo
                    </button>
                </div>
            )}
        </section>
    );
}
export default DragDropFile;
