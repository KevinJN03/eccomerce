import '../../CSS/item_page.scss';
import { useProductContext } from '../../context/productContext';
function Item_List({  }) {
    const { product, handleImgChange, loading } = useProductContext();
    return (
        <section id="item-list-section">
            <section id="item-list-wrapper">
                {loading ? (
                    <>
                        {new Array(3).fill(1).map((item, idx) => {
                            return (
                                <div className="photo-wrapper" key={idx}>
                                    <img className="list-image skeleton-pulse min-h-full min-w-full"></img>
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <>
                        {product?.images?.map((image, index) => {
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
                    </>
                )}
            </section>
        </section>
    );
}

export default Item_List;
