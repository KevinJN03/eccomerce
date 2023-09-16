function Similar_Styles({ images }) {
    return (
        <section id="similar_styles">
            <div className="styles-image-wrapper">
                {images.map((image, index) => {
                    return <img loading="lazy" src={image} key={index}></img>;
                })}
            </div>
            <div className="flex w-full flex-row justify-between sm+md:items-center lg:mb-12">
                <h2 className="!self-end text-2xl font-extrabold sm:text-lg">
                    SEE 20+ SIMILAR STYLES
                </h2>
                <button type="button" id="similar-btn">
                    Shop Similar
                </button>
            </div>
        </section>
    );
}

export default Similar_Styles;
