function Main_Image({product}) {
    return (
        <section id="Main_Image">
            <img
                src={product.image}
                className="h-full w-full object-cover "
            />
        </section>
    );
}

export default Main_Image;
