function Product({ img, title, price, variation1, variation2 }) {
    return (
        <div className="flex flex-col">
            <div className="w-44 hover:underline">
                <img className="mt-6 h-56 w-44 object-cover" src={img || ''} />

                <p className="mt-4 w-44">{title}</p>
            </div>

            <p className="py-6 font-gotham text-base tracking-widest text-primary">
                {`£${parseFloat(price).toFixed(2) || ''}`}
            </p>

            <p className="w-44 border-y-[1px] py-3 text-sm font-light">
                {variation1}
            </p>
            {variation2 && (
                <p className="mb-6 border-b-[1px] py-3">{variation2}</p>
            )}
        </div>
    );
}

export default Product;
