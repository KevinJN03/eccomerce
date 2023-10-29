function Similar_Styles({ images }) {
    return (
        <section id="similar_styles">
            <div className="styles-image-wrapper">
                {images.map((image, index) => {
                    return <img loading="lazy" src={image} key={index}></img>;
                })}
            </div>
            <div className="flex w-full flex-row justify-between !items-center lg:mb-12 gap-x-5 h-10">
                <h2 className=" h-full flex items-center text-xl font-extrabold sm:text-lg whitespace-nowrap">
                    SEE 20+ SIMILAR STYLES
                </h2>
                <button type="button" id="similar-btn" className="!bg-[var(--black)]">
                    Shop Similar
                </button>
            </div>
        </section>
    );
}

export default Similar_Styles;
