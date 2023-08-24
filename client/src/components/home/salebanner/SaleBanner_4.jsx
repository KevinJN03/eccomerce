function SaleBanner_4({images}){
    const imageStyle = {
        width: "calc(100% / 4)",
        height: "100%",
      };
      return (
        <section id="section-1" className="section-1 salebanner-gap max-700px">
          {images.map((img) => {
            return (
              <>
                <div id="section-1-wrapper" style={imageStyle} className="h-full relative">
                  <img src={img.url} className="object-cover object-center w-full h-full"/>
                  <h3 className="absolute font-bold salebanner4-text">
                    {img.text ? img.text : ""}
                  </h3>
                </div>
              </>
            );
          })}
        </section>
      );
}

export default SaleBanner_4