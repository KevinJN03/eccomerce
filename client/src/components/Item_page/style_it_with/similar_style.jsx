function Similar_Styles({ images }) {
    return (
        <section id="similar_styles">
            <div className="styles-image-wrapper">
                {images.map((image, index) => {
                    return <img loading="lazy" src={image} key={index}></img>;
                })}
            </div>
            <div className="flex h-10 w-full flex-row !items-center justify-between gap-x-5 lg:mb-12">
                <h2 className=" flex h-full items-center whitespace-nowrap text-xl font-extrabold sm:text-lg">
                    SEE 20+ SIMILAR STYLES
                </h2>
                <button
                    type="button"
                    id="similar-btn"
                    className="!bg-[var(--black)]"
                >
                    Shop Similar
                </button>
            </div>
        </section>
    );
}

export default Similar_Styles;
