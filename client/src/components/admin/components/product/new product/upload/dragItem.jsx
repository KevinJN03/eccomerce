import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useNewProduct } from '../../../../../../context/newProductContext';
import { useRef } from 'react';
import wiredIcon from '../../../../../../assets/icons/wired-outline-49-plus-circle.webp';
import close from '../../../../../../assets/icons/close.png';

import { motion, easeInOut } from 'framer-motion';
function DragItem({ id, droppableId, className, handleAddPhoto, deletePhoto }) {
    const addInputRef = useRef();
    const { files } = useNewProduct();

    const variants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                ease: 'easeInOut',
                duration: 0.9,
            },
        },
        exit: {
            opacity: 0,
        },
    };
    return (
        <Droppable
            droppableId={droppableId}
            // direction={'horizontal'}
            isDropDisabled={files[id]?.isDragDisabled}
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
                        isDragDisabled={files[id]?.isDragDisabled}
                    >
                        {(provided, snapshot) => (
                            <div
                                className="relative h-full w-full rounded-inherit"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                {files[id]?.file ? (
                                    <>
                                        {!snapshot.isDragging && (
                                            <motion.button
                                                // key={snapshot.isDragging}
                                                variants={variants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                                type="button"
                                                className="delete-btn absolute bottom-2 right-3 h-8 w-8 rounded-full bg-slate-100 p-2 transition-all hover:bg-slate-200"
                                                onClick={() =>
                                                    deletePhoto(files[id])
                                                }
                                            >
                                                <img
                                                    className="h-full w-full"
                                                    src={close}
                                                />
                                            </motion.button>
                                        )}
                                        <motion.img
                                            // key={snapshot.isDragging}
                                            variants={variants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            loading="lazy"
                                            src={files[id]?.img}
                                            className="!object-contain object-cover"
                                        />
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
                                                handleAddPhoto(e, files[id])
                                            }
                                            accept="image/jpeg, image/png, image/webp"
                                            hidden
                                            multiple
                                        />
                                        <img
                                            src={wiredIcon}
                                            className=" !max-h-[80px] !max-w-[80px] !object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </Draggable>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default DragItem;
