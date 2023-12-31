// import hero image

function Hero({ image, height }) {
    return (
        <section id="hero" className={`w-full ${height} h-full`}>
            <div className="h-full">
                <img
                    src={image}
                    className="h-full w-full object-contain object-center"
                    loading="lazy"
                ></img>
            </div>
        </section>
    );
}

export default Hero;
