function Section_1({ images }) {
    const imageStyle = {
        width: 'calc(100% / 4)',
        height: '100%',
    };
    return (
        <section id="section-1" className="section-1">
            {images.map((img) => {
                return (
                    <>
                        <div
                            id="section-1-wrapper"
                            style={imageStyle}
                            className="relative h-full"
                        >
                            <img
                                src={img.url}
                                className="h-full w-full object-cover object-center"
                            />
                            <h3 className="bottom-text absolute font-bold">
                                {img.text ? img.text : ''}
                            </h3>
                        </div>
                    </>
                );
            })}
        </section>
    );
}

export default Section_1;
