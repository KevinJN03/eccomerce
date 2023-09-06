function Main_Image({ images}) {
    return (
        <section id="main_image">
            {images && images.map((image, index) => {
                return (
                    <img
                        src={image}
                        key={index}
                        className="h-full w-full lg:object-cover object-center sm+md:object-contain md:w-[300px]"
                    />
                );
            })}
        </section>
    );
}

export default Main_Image;
