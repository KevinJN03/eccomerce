import plane from '../../assets/icons/takeoff-the-plane.png';
function Shipping({}) {
    return (
        <section id="Shipping">
            <div className="shipping-icon">
                <img loading="lazy" src={plane} className="h-full w-full" />
            </div>
            <div className="sm+md:mb-5">
                <p className="font-semibold sm:mb-1 sm:text-xs">
                    Free Shipping ($125+)
                </p>
                <p className="sm:text-xs">
                    Estimated Delivery: Thursday, September 7{' '}
                </p>
            </div>
        </section>
    );
}

export default Shipping;
