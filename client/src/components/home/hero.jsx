// import hero image

function Hero({ image, height }) {
    return (
        <section id="hero" className={`w-full ${height}`}>
            <div>
                <img src={image} className="w-full h-full object-contain object-center"></img>
            </div>
        </section>
    );
}

export default Hero;
