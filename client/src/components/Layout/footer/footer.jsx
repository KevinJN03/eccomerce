import Payment_Methods from '../../cart/payment_methods';
import Footer_Copyright from './footer_copyright';
import Section_1 from './section_1';
import Section_2 from './section_2';
import Section_3 from './section_3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInstagram,
    faSnapchat,
    faSquareFacebook,
} from '@fortawesome/free-brands-svg-icons';
import snapchat from '../../../assets/icons/Snapchat-Ghost-Outlined-Logo.wine (1).svg';
function Footer() {
    return (
        <div className="footer-wrapper">
            <section className="footer-header flex h-14 w-full items-center justify-center bg-white py-2 sm+md:px-4">
                <div className="left ">
                    <div className="item">
                        <FontAwesomeIcon icon={faSquareFacebook} />
                    </div>
                    <div className="item">
                        <FontAwesomeIcon icon={faInstagram} />
                    </div>
                    {/* <div className="item"><FontAwesomeIcon icon={faSnapchat} className="snapchat" style={{color: "#ffffff"}}/></div> */}
                    <div className="item">
                        <img
                            className="snapchat"
                            src={snapchat}
                            alt="snapchat icon"
                        />
                    </div>
                </div>
                <span className="divider"></span>
                <div className="right">
                    <Payment_Methods className="mr-7 h-9 w-9 !border-none sm:!h-5 sm:!w-5" />
                </div>
            </section>
            <footer className="footer">
                <div className="footer-section mt-3 flex flex-row justify-center sm+md:gap-1 lg:gap-5">
                    <Section_1 />
                    <Section_2 />
                    <Section_3 />
                </div>
            </footer>

            <div className="footer_copyright-wrapper">
                <Footer_Copyright />
            </div>
        </div>
    );
}

export default Footer;
