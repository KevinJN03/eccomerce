import Info from '../../common/info';

function Item({ image, title, price, text }) {
    return (
        <div className="card border-0">
            <div id="image-wrapper" className="h-full w-full">
                <img src={image} className="h-full w-full" />
            </div>
            <Info title={title} price={price} text={text} />
        </div>
    );
}

export default Item;
