function Similar_Styles({ images }) {
    return (
        <section id="similar_styles">
            <div className="styles-image-wrapper">
                {images.map((image) => {
                    return <img src={image}></img>;
                })}
            </div>
            <div className="mb-12 flex w-full flex-row justify-between">
                <h2 className="text-2xl font-extrabold">
                    See 20+ SIMILAR STYLES
                </h2>
                <button type="button" id="similar-btn">
                    Shop Similar
                </button>
            </div>
        </section>
    );
}

export default Similar_Styles;
