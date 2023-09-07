import './upload.scss';
import add_image from './add-image.png';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import close from '../../../../../../assets/icons/close.png';
function Upload({ files, setFiles }) {
    console.log('files at upload', files);
    const addInputRef = useRef();
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

    const handleAddphoto = (e, newfiles) => {
        console.log('you clicked on', newfiles);

        const images = Array.from(e.target.files, (file) =>
            URL.createObjectURL(file)
        );

        const findFile = files.find((item) => item.isDragDisabled == true);

        setFiles(
            files.map((file) => {
                if (file.id === findFile.id) {
                    return { ...file, img: images[0], isDragDisabled: false };
                }
                return file;
            })
        );

        console.log('files after update', files);
    };

    const deletePhoto = (oldfile) => {
        let newfile = oldfile;
        delete newfile.img;
        newfile.isDragDisabled = true;

        setFiles(
            files.map((item) => {
                if (item.id == oldfile.id) {
                    return newfile;
                }
                return item;
            })
        );
    };

    function DragItem({ id, droppableId, className }) {
        return (
            <Droppable
                droppableId={droppableId}
                direction={'vertical'}
                isDropDisabled={files[id].isDragDisabled}
            >
                {(provided) => (
                    <div
                        className={className}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <Draggable
                            key={files[id].id}
                            index={id}
                            draggableId={files[id].id}
                            isDragDisabled={files[id].isDragDisabled}
                        >
                            {(provided) => (
                                <div
                                    className="relative h-full w-full rounded-inherit"
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                >
                                    {files[id].img ? (
                                        <>
                                            <button
                                                type="button"
                                                className="delete-btn absolute right-3 top-2 h-8 w-8 bg-red-600 p-2"
                                                onClick={() =>
                                                    deletePhoto(files[id])
                                                }
                                            >
                                                <img
                                                    className="h-full w-full"
                                                    src={close}
                                                />
                                            </button>
                                            <img src={files[id].img} />
                                        </>
                                    ) : (
                                        <div
                                            className="flex h-full w-full items-center justify-center"
                                            onClick={() =>
                                                addInputRef.current.click()
                                            }
                                        >
                                            <input
                                                type="file"
                                                ref={addInputRef}
                                                onChange={(e) =>
                                                    handleAddphoto(e, files[id])
                                                }
                                                accept="image/jpeg,image/x-png"
                                                hidden
                                            />
                                            <img
                                                src={add_image}
                                                className="add-image"
                                            />
                                        </div>
                                    )}

                                    {/* when ever there isnt an image youcan update it with the  */}
                                </div>
                            )}
                        </Draggable>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }

    return (
        <section id="upload-section">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <section id="upload">
                    <section className="main-img">
                        <DragItem
                            id={0}
                            droppableId={'main-0'}
                            className="img-container"
                        />
                        <DragItem
                            id={1}
                            droppableId={'main-1'}
                            className="img-container"
                        />
                    </section>
                    <section className="additional-img">
                        <DragItem
                            id={2}
                            droppableId={'additional-1'}
                            className="add-img-container"
                        />
                        <DragItem
                            id={3}
                            droppableId={'additional-2'}
                            className="add-img-container"
                        />
                        <DragItem
                            id={4}
                            droppableId={'additional-3'}
                            className="add-img-container"
                        />
                        <DragItem
                            id={5}
                            droppableId={'additional-4'}
                            className="add-img-container"
                        />
                    </section>
                </section>
            </DragDropContext>
        </section>
    );
}

export default Upload;
