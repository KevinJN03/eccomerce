function Stats({product}) {
    return (
        <div className="mt-8 flex w-full flex-row">
            <div className="left flex w-full flex-1 flex-col gap-3">
                <h6 className="text-sm font-semibold">LAST 30 DAYS</h6>
                <section className="flex w-full flex-row">
                    <div className="flex-1 ">
                        <p className="text-xs text-black/70">0</p>
                        <p className="text-xs text-black/70">visits</p>
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-black/70">0</p>
                        <p className="text-xs text-black/70">favorites</p>
                    </div>
                </section>
            </div>
            <div className="right flex w-full flex-1 flex-col gap-3">
                <h6 className="text-sm font-semibold">ALL TIME</h6>
                <section className="flex w-full flex-row">
                    <div className="flex-1">
                        <p className="text-xs text-black/70">
                            {product.stats?.sales}
                        </p>
                        <p className="text-xs text-black/70">sales</p>
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-black/70">
                            £{parseFloat(product.stats?.revenue).toFixed(2)}
                        </p>
                        <p className="text-xs text-black/70">revenue</p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Stats;
