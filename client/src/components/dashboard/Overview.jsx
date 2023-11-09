import image from '../../assets/images/men-image.jpg';
function Overview({}) {
    return (
        <section className="overview relative h-full">
            <span className="absolute flex flex-col gap-y-2 left-10 top-16">
                <p className="!bg-primary text-3xl font-bold text-white p-2 w-fit">
                    WELCOME TO
                </p>
                <p className="!bg-primary text-3xl font-bold text-white p-2">
                    YOUR ACCOUNT
                </p>
            </span>
            <img src={image} className="h-full object-cover" />
        </section>
    );
}

export default Overview;
