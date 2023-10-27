import './upload.scss';

import { DragDropContext } from 'react-beautiful-dnd';

import { useNewProduct } from '../../../../../../context/newProductContext';
import DragItem from './dragItem';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
function Upload({}) {
    const { files, setFiles } = useNewProduct();
 

    const handleOnDragEnd = (result) => {
      
 
        if (!result.destination) return;

        const items = Array.from(files);
        // if (items[result.destination.index].isDragDisabled == true) return;
        const [reorderedItems] = items.splice(result.source.index, 1);

        // check if the destination index isdisabled true, it should return to the original place
        items.splice(result.destination.index, 0, reorderedItems);
        setFiles(items);
    };

    const handleAddPhoto = (e) => {
        const images = Array.from(e.target.files);
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
        delete updateFile.img

       
        updateFile.isDragDisabled = true;
        const newFiles = [...files];
        const findIndex = files.findIndex((item) => item.id == oldFile.id);
        newFiles.splice(findIndex, 1);
        newFiles.push(updateFile);
        setFiles(newFiles);
        console.log({updateFile})
    };



    return (
        <section id="upload-section">
            <AnimatePresence>
                <DragDropContext
                    onDragEnd={handleOnDragEnd}
                   
                >
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
                                        droppableId={`additional-${idx}`}
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
