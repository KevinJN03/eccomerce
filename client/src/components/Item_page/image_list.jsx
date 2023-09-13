import '../../CSS/item_page.css';
function Item_List({ images, handleImgChange }) {
    return (
        <section id="item-list-section">
            <section id="item-list-wrapper">
                {images.map((image, index) => {
                    return (
                        <div className="photo-wrapper" key={index}>
                            <img
                                src={image}
                                className="list-image"
                                onClick={handleImgChange}
                            />
                        </div>
                    );
                })}
            </section>
        </section>
    );
}

export default Item_List;
