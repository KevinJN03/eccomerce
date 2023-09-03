import Payment_Methods from '../../cart/payment_methods';
import Footer_Copyright from './footer_copyright';
import Section_1 from './section_1';
import Section_2 from './section_2';
import Section_3 from './section_3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram,faSnapchat,faSquareFacebook} from '@fortawesome/free-brands-svg-icons'
import snapchat from "../../../assets/icons/Snapchat-Ghost-Outlined-Logo.wine (1).svg"
function Footer() {
    return (
        <div className="footer-wrapper">
            <section className="footer-header w-full bg-white h-14 flex justify-center items-center py-2">
                <div className="left flex flex-row w-40 h-full justify-around items-center">
                <div className="item"><FontAwesomeIcon icon={faSquareFacebook} style={{color: "#ffffff",}} /></div>
                    <div className="item"><FontAwesomeIcon icon={faInstagram} style={{color: "#ffffff"}} /></div>
                    {/* <div className="item"><FontAwesomeIcon icon={faSnapchat} className="snapchat" style={{color: "#ffffff"}}/></div> */}
                    <div className="item">
                        <img className="snapchat" src={snapchat} alt="snapchat icon" />
                    </div>
                </div>
                <span className='divider'></span>
                <div className="right">
                    <Payment_Methods className="h-9 w-9 mr-7"/>
                </div>
            </section>
            <footer className="footer">
                <div className="mt-3 flex flex-row justify-center gap-5">
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
