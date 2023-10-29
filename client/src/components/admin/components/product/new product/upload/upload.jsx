import './upload.scss';

import { DragDropContext } from 'react-beautiful-dnd';

import { useNewProduct } from '../../../../../../context/newProductContext';
import DragItem from './dragItem';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
function Upload({}) {
    const { files, setFiles } = useNewProduct();

    const handleOnDragEnd = (result) => {
        try {
            if (!result.destination || !result.source) return;
            const items = Array.from(files);
            const reorderedItems = items[result.source.index];
            const nextReorderItem = items[result.destination.index];
      console.log({result})
            // items.splice(result.destination.index, 1, reorderedItems);
            // items.splice(result.source.index, 1, nextReorderItem);
items[result.destination.index] = reorderedItems
items[result.source.index] = nextReorderItem
            console.log({ items });
            setFiles(() => items);
        } catch (error) {
            console.log('error while dragging product photo: ', error);
            setFiles(() => files);
        }
    };

    const handleAddPhoto = (e) => {
        const images = Array.from(e.target.files).reverse();
        let counter = 0;
        setFiles(
            files.map((file) => {
                if (file.isDragDisabled == true && images[counter] != null) {
                    const newFile = {
                        ...file,
                        file: images[counter],
                        img: URL.createObjectURL(images[counter]),
                        isDragDisabled: false,
                    };
                    counter += 1;

                    return newFile;
                }

                return file;
            })
        );
    };

    const deletePhoto = (oldFile) => {
        let updateFile = { ...oldFile };
        delete updateFile.file;
        delete updateFile.img;

        updateFile.isDragDisabled = true;
        const newFiles = [...files];
        const findIndex = files.findIndex((item) => item.id == oldFile.id);
        newFiles.splice(findIndex, 1);
        newFiles.push(updateFile);
        setFiles(newFiles);
        console.log({ updateFile });
    };

    return (
        <section id="upload-section">
            <AnimatePresence>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <section id="upload">
                        <section className="main-img">
                            {[0, 1].map((item) => {
                                return (
                                    <DragItem
                                        id={item}
                                        key={item}
                                        droppableId={`main-${item}`}
                                        className="img-container"
                                        handleAddPhoto={handleAddPhoto}
                                        deletePhoto={deletePhoto}
                                    />
                                );
                            })}
                        </section>
                        <section className="additional-img">
                            {[2, 3, 4, 5].map((item, idx) => {
                                return (
                                    <DragItem
                                        id={item}
                                        key={item}
                                        droppableId={`additional-${item}`}
                                        className="add-img-container"
                                        handleAddPhoto={handleAddPhoto}
                                        deletePhoto={deletePhoto}
                                    />
                                );
                            })}
                        </section>
                    </section>
                </DragDropContext>
            </AnimatePresence>
        </section>
    );
}

export default Upload;
