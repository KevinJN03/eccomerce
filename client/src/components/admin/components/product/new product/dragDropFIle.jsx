import { useState, useRef } from 'react';
import dragImage from './dragtest/dragtest';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Upload from './upload/upload';
import { v4 as uuidv4} from "uuid"
function DragDropFile() {
    const [files, setFiles] = useState();
    console.log('files', files);
    const inputRef = useRef();
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleDrop = (e) => {
        e.preventDefault();
        console.log("e.dataTransfer.files", e.dataTransfer.files)
        const filesImg = Array.from((e.dataTransfer.files), (file) => ({ id: uuidv4() , img : URL.createObjectURL(file) , isDragDisabled: false}))
        if(filesImg.length < 6) {

            
            for(let i = filesImg.length; i < 6; i++) {
                let obj = {id: uuidv4(), isDragDisabled: true}
                filesImg.push(obj);
                console.log("filesImg while iterating:", filesImg)
            }
        }
        console.log("filesImg ", filesImg)
        setFiles(filesImg);
    };

    const handleInput = (e) => {
        e.preventDefault();
        
        const filesImg = Array.from((e.target.files), (file) => ({ id: uuidv4() , img : URL.createObjectURL(file) , isDragDisabled: false}))
        if(filesImg.length < 6) {

            
            for(let i = filesImg.length; i < 6; i++) {
                let obj = {id: uuidv4(), isDragDisabled: true}
                filesImg.push(obj);
                console.log("filesImg while iterating:", filesImg)
            }
        }
        console.log("filesImg ", filesImg)
        setFiles(filesImg);
    };

    if (files) return (
        <>
          {console.log("files before going to upload", files)}
    <Upload files={files} setFiles={setFiles} />
        </>
  
    );

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
                        onChange={(e) => handleInput(e)}
                        // onChange={(e) => console.log(e.target)}
                        hidden
                        accept="image/png, image/jpeg"
                        ref={inputRef}
                    />
                    <button
                        type="button"
                        onClick={() => inputRef.current.click()}
                    >
                        Select Photo
                    </button>
                </div>
            )}
        </section>
    );
}
export default DragDropFile;
