import plane from '../../assets/icons/takeoff-the-plane.png';
function Shipping({}) {
    return (
        <section id="Shipping">
            <div className="shipping-icon">
                <img src={plane} className="h-full w-full" />
            </div>
            <div>
                <p>Free Shipping ($125+)</p>
                <p>Estimated Delivery: Thursday, September 7 </p>
            </div>
        </section>
    );
}

export default Shipping;
