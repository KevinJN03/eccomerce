// import hero image

function Hero({image, height}){
    return(
        <section id="hero" className={`w-full ${height}`}>
            <div>
                <img src={image}></img>
            </div>
        </section>
    )
}

export default Hero