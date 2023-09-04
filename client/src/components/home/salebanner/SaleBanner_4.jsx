function SaleBanner_4({ images }) {
    return (
        <section className="section-1 sm:!h-72">
            {images.map((img) => {
                return (
                    <>
                        <div
                            id="section-1-wrapper"
                           
                            className=" h-full relative"
                        >
                            <img
                                src={img.url}
                                className="h-full w-full object-cover object-center"
                            />
                            <div className={`salebanner4-text absolute font-bold`}>
                                {/* {img.text ? img.text : ''} */}
                                <img src={img.src} className="w-full h-full "/>
                            </div>
                        </div>
                    </>
                );
            })}
        </section>
    );
}

export default SaleBanner_4;
