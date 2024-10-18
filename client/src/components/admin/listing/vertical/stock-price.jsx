function Stock_Price({ product }) {
    return (
        <div className="flex h-full flex-[5] flex-row items-baseline">
            <section className="flex w-full flex-col">
                <div className="mt-4 flex w-full max-w-xs flex-row justify-between">
                    <p className="text-s text-black/70 underline">
                        {product.additional_data.stock?.total} in stock
                    </p>

                    {product.additional_data.price?.min ==
                    product.additional_data.price?.max ? (
                        <p className="text-s text-black/70 underline">
                            £{product.additional_data.price?.min}
                        </p>
                    ) : (
                        <p className="text-s text-black/70 underline">
                            £{product.additional_data.price?.min}-£
                            {product.additional_data.price?.max}
                        </p>
                    )}
                </div>
            </section>
            {product?.note && (
                <p className="whitespace-nowrap pr-6 text-right text-xs text-black/70">
                    {product.note}
                </p>
            )}
        </div>
    );
}

export default Stock_Price;
