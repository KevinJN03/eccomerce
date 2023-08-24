function Section_1({ images }) {
  const imageStyle = {
    width: "calc(100% / 4)",
    height: "100%",
  };
  return (
    <section id="section-1" className="section-1">
      {images.map((img) => {
        return (
          <>
            <div id="section-1-wrapper" style={imageStyle} className="h-full relative">
              <img src={img.url} className="object-cover object-center w-full h-full"/>
              <h3 className="absolute font-bold bottom-text">
                {img.text ? img.text : ""}
              </h3>
            </div>
          </>
        );
      })}
    </section>
  );
}

export default Section_1;
