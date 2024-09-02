import image from '../../assets/images/men-image.jpg';
function Overview({}) {
    return (
        <section className="overview relative h-full">
            <span className="absolute left-10 top-16 flex flex-col gap-y-2">
                <p className="w-fit !bg-primary p-2 text-3xl font-bold text-white">
                    WELCOME TO
                </p>
                <p className="!bg-primary p-2 text-3xl font-bold text-white">
                    YOUR ACCOUNT
                </p>
            </span>
            <img src={image} className="h-full object-cover" />
        </section>
    );
}

export default Overview;
