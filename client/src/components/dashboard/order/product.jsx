import { Link } from "react-router-dom";

function Product({ img, title, price, variation1, variation2, id }) {
    return (
        <div className="flex h-full flex-col w-40">
            <div className="w-full hover:underline mb-4">
                <img className="mt-6 h-56 w-full object-cover" src={img || ''} />
            </div>
            <div className="h-full">
                <p className="w-full text-s hover:underline text-ellipsis overflow-hidden !h-10 mb-4"><Link target="_blank" to={`/product/${id}`}>
                    {title}
                    </Link></p>

                <p className="py-0  h-8 font-gotham text-base tracking-widest text-primary">
                    {`£${parseFloat(price).toFixed(2) || ''}`}
                </p>

                <p className="w-full border-y-[1px] py-3 text-sm font-light h-10">
                    {variation1}
                </p>
                {variation2 && (
                    <p className="mb-6 border-b-[1px] py-3 h-10">{variation2}</p>
                )}
            </div>
        </div>
    );
}

export default Product;
