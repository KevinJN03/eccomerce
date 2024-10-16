import { useEffect, useRef, useState } from 'react';
import Upload from './upload/upload';
import { v4 as uuidv4 } from 'uuid';
import { useNewProduct } from '../../../../../context/newProductContext';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import OptionError from './variation/error/optionError';

function dragDropFile({}) {
    const { files, setFiles, publishError, publishErrorDispatch } =
        useNewProduct();

    const inputRef = useRef();
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const convertToArray = (files) => {
        const convert = Array.from(files, (file) => ({
            id: uuidv4(),
            file: file,
            img: URL.createObjectURL(file),
            isDragDisabled: false,
        })).reverse();

        return convert.slice(0, 6);
    };
    const handleDrop = (e) => {
        e.preventDefault();

        const newFiles = convertToArray(e.dataTransfer.files);

        if (newFiles.length < 6) {
            for (let i = newFiles.length; i < 6; i++) {
                let obj = { id: uuidv4(), isDragDisabled: true };
                newFiles.push(obj);
            }
            setFiles(newFiles);
        }

        publishErrorDispatch({ type: 'CLEAR', path: 'files' });
    };
    const handleInput = (e) => {
        e.preventDefault();
        const newFiles = convertToArray(e.target.files);
        if (newFiles.length < 6) {
            for (let i = newFiles.length; i < 6; i++) {
                let obj = { id: uuidv4(), isDragDisabled: true };
                newFiles.push(obj);
            }
        }

        setFiles(newFiles);
        publishErrorDispatch({ type: 'CLEAR', path: 'files' });
    };

    return (
        <section className={publishError?.files ? '' : ''}>
            {files.length == 0 && (
                <div
                    className="dropzone"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <h1 className="text-center text-lg font-medium">
                        Drag and Drop Files to Upload
                    </h1>
                    <input
                        type="file"
                        multiple
                        onChange={(e) => handleInput(e)}
                        hidden
                        accept="image/png, image/jpeg, image/webp"
                        ref={inputRef}
                    />
                    <button
                        className="options-btn"
                        type="button"
                        onClick={() => inputRef.current.click()}
                    >
                        <span>
                            <AddSharpIcon />
                        </span>{' '}
                        Add up to 6 photos
                    </button>
                </div>
            )}
            {files.length > 0 && <Upload />}

            {publishError?.files && (
                <OptionError
                    msg={publishError.files}
                    className={'!m-0 px-0 pb-0 pt-2'}
                />
            )}
        </section>
    );
}
export default dragDropFile;
