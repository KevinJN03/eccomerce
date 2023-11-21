import '../../CSS/item_page.scss';
function Item_List({ images, handleImgChange, loading }) {
    return (
        <section id="item-list-section">
            <section id="item-list-wrapper">
                {loading ? (
                    <div className="skeleton-pulse h-full "></div>
                ) : (
                    <>
                        {images.map((image, index) => {
                            return (
                                <>
                                    <div className="photo-wrapper" key={index}>
                                        <img
                                            src={image}
                                            className="list-image"
                                            onClick={handleImgChange}
                                        />
                                    </div>
                                </>
                            );
                        })}
                    </>
                )}
            </section>
        </section>
    );
}

export default Item_List;
