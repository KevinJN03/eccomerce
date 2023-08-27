import { Link } from 'react-router-dom';

function Footer_Copyright() {
    return (
        <section className="footer-copyrght">
            <div>
                <p className='text-xs'>© 2023 Glamo, LLC All Rights Reserved</p>
            </div>
            <div>
                <a className='text-xs' href="pages/promo-terms-and-conditions">PromoT&Cs</a>
                <a className='text-xs' href="pages/privacy-policy">Privacy Policy</a>
                <a className='text-xs' href="pages/terms-of-service">Terms Of Service</a>
                <a className='text-xs' href="pages/privacy-policy#donotsell">
                    DO Not Sell My Information
                </a>
            </div>
        </section>
    );
}

export default Footer_Copyright;
