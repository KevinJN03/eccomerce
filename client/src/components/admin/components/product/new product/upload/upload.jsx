import './upload.scss';

import { DragDropContext } from 'react-beautiful-dnd';

import { useNewProduct } from '../../../../../../context/newProductContext';
import DragItem from './dragItem';
function Upload({}) {
    const { files, setFiles } = useNewProduct();
    console.log('files at upload', files);
    const handleOnDragEnd = (result) => {
        console.log(result);
        if (!result.destination) return;

        const items = Array.from(files);
        if (items[result.destination.index].isDragDisabled == true) return;
        const [reorderedItems] = items.splice(result.source.index, 1);

        // check if the destination index isdisabled true, it should return to the original place
        items.splice(result.destination.index, 0, reorderedItems);
        setFiles(items);
    };

    const handleAddPhoto = (e, newfiles) => {
        console.log('you clicked on', newfiles);

        const images = Array.from(e.target.files, (file) =>
            URL.createObjectURL(file)
        );
        let counter = 0;
        setFiles(
            files.map((file) => {
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

                return file;
            })
        );
    };

    const deletePhoto = (oldFile) => {
        let updateFile = { ...oldFile };
        delete updateFile.img;
        updateFile.isDragDisabled = true;

        setFiles(
            files.map((item) => {
                if (item.id == oldFile.id) {
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
                        {[0, 1].map((item) => {
                            return (
                                <DragItem
                                    id={item}
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
        </section>
    );
}

export default Upload;
