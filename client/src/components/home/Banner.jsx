function Banner() {
    return (
        <>
            <section id="banner" className="flex w-full flex-row ">
                <div
                    id="promo"
                    className="background-color-pink flex w-full items-center justify-center"
                >
                    <div id="banner-text">
                        <h1 className="font-extrabold ">
                            UP TO 30% OFF ALMOST EVERYTHING*
                        </h1>

                        <p className="font-light ">
                            {' '}
                            *Mystery discount revealed @ checkout With Code:
                            SURPISE
                        </p>
                    </div>
                </div>
                <div
                    id="promo"
                    className="flex h-20 w-full items-center justify-center"
                >
                    <div id="banner-text">
                        <h1 className="font-extrabold ">GLAMO PREMIER</h1>

                        <p className="font-light">
                            Unlimited free Next day Delivery for a whole year
                            for £9.95.
                        </p>
                    </div>
                </div>
            </section>
            <div
                id="discount"
                className="background-color-pink flex w-full justify-center"
            >
                <div className="py-10	text-center ">
                    <h1 className="py-2 text-6xl font-black italic">
                        UP TO 30%{' '}
                    </h1>
                    <h1 className="text-5xl font-extrabold italic">
                        OFF ALMOST EVERTYTHING!*
                    </h1>
                    <h4 className="py-3 text-3xl font-bold">
                        *Mystery* discount revealed @ checkout{' '}
                    </h4>
                    <h1 className="mb-3 text-2xl font-bold">
                        With code :{' '}
                        <span className="border-2 border-black  px-2 py-1">
                            SURPRISE
                        </span>
                    </h1>
                    <p className="text-xs text-black">
                        *Minimum spend of £20 applies. See website banner for
                        full Ts&Cs. Selected marked products excluded from
                        promo.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Banner;
