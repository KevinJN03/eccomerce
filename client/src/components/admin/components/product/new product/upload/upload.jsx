import './upload.scss';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';

import { useNewProduct } from '../../../../../../context/newProductContext';
import DragItem from './dragItem';
function Upload({}) {


    const { files, setFiles } = useNewProduct();
    console.log('files at upload', files);
    // const addInputRef = useRef();
    const handleOnDragEnd = (result) => {
        console.log(result);
        if (!result.destination) return;

        const items = Array.from(files);
        if (items[result.destination.index].isDragDisabled == true) return;
        const [reorderedItems] = items.splice(result.source.index, 1);

        // check i f the destination index isdisabled true, it should return to the original place
        items.splice(result.destination.index, 0, reorderedItems);
        setFiles(items);
    };

    const handleAddPhoto = (e, newfiles) => {
        console.log('you clicked on', newfiles);

        const images = Array.from(e.target.files, (file) =>
            URL.createObjectURL(file)
        );

        const findFile = files.find((item) => item.isDragDisabled == true);
        let counter = 0;
        setFiles(
            files.map((file) => {
                // if (file.id === findFile.id) {

                if (file.isDragDisabled == true && images[counter] != null) {
                    console.log('image counter', images);
                    const newFile = {
                        ...file,
                        img: images[counter],
                        isDragDisabled: false,
                    };
                    counter += 1;
                    console.log('newFile after adding', newFile);
                    return newFile;
                }

                // }
                return file;
            })
        );

        // console.log('files after update', files);
    };

    const deletePhoto = (oldfile) => {
        let updateFile = {...oldfile};
        delete updateFile.img;
        updateFile.isDragDisabled = true;

        setFiles(
            files.map((item) => {
                if (item.id == oldfile.id) {
                    return updateFile;
                }
                return item;
            })
        );
    };

    return (
        <section id="upload-section">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <section id="upload">
                    <section className="main-img">
                        {
                            [0, 1].map((item) => {
                               return (
                                <DragItem
                            id={item}
                            droppableId={`main-${item}`}
                            className="img-container"
                            handleAddPhoto={handleAddPhoto}
                            deletePhoto={deletePhoto}
                        />
                               ) 
                            })
                        }
                    </section>
                    <section className="additional-img">
                        {[2,3, 4, 5].map(((item, idx) => {
                            return (
                                <DragItem
                                id={item}
                                droppableId={`additional-${idx}`}
                                className="add-img-container"
                                handleAddPhoto={handleAddPhoto}
                                deletePhoto={deletePhoto}
                            /> 
                            )
                        }))}
                    </section>
                </section>
            </DragDropContext>
        </section>
    );
}

export default Upload;
