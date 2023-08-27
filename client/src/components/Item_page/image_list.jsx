import '../../CSS/item_page.css';
function Item_List({}) {
    const image =
        'https://www.fashionnova.com/cdn/shop/files/07-06-23Studio7_ID_DJ_09-23-39_13_ZDF01K330031_DarkBrown_11321_CM_468x.jpg?v=1689116450';
    return (
        <section id="item-list-section">
            <section id="item-list-wrapper">
                <div className="photo-wrapper">
                    <img src={image} className="list-image" />
                </div>
                <div className="photo-wrapper">
                    <img src={image} className="list-image" />
                </div>
                <div className="photo-wrapper">
                    <img src={image} className="list-image" />
                </div>
                <div className="photo-wrapper">
                    <img src={image} className="list-image" />
                </div>
                <div className="photo-wrapper">
                    <img src={image} className="list-image" />
                </div>
            </section>
        </section>
    );
}

export default Item_List;
