import '../../CSS/item_page.css';
function Item_List({ images }) {
    return (
        <section id="item-list-section">
            <section id="item-list-wrapper">
                {images.map((image, index) => {
                    return (
                        <div className="photo-wrapper">
                            <img src={image} className="list-image" />
                        </div>
                    );
                })}
            </section>
        </section>
    );
}

export default Item_List;
