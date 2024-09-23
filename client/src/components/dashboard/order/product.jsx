import { Link } from 'react-router-dom';

function Product({ img, title, price, variation1, variation2, id }) {
    return (
        <div className="flex h-full w-40 flex-col">
            <div className="mb-4 w-full hover:underline">
                <img
                    className="mt-6 h-56 w-full object-cover"
                    src={img || ''}
                />
            </div>
            <div className="h-full">
                <p className="mb-4 !h-10 w-full overflow-hidden text-ellipsis text-s hover:underline">
                    <Link target="_blank" to={`/product/${id}`}>
                        {title}
                    </Link>
                </p>

                <p className="h-8  py-0 font-gotham text-base tracking-widest text-primary">
                    {parseFloat(price).toLocaleString('en-GB', {
                        style: 'currency',
                        currency: 'GBP',
                    })}
                </p>

                <p className="h-10 w-full border-y-[1px] py-3 text-sm font-light">
                    {variation1}
                </p>
                {variation2 && (
                    <p className="mb-6 h-10 border-b-[1px] py-3">
                        {variation2}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Product;
