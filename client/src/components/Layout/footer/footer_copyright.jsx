import { Link } from "react-router-dom";

function Footer_Copyright() {
  return (
    <section className="footer-copyrght">
      <div>
        <p>© 2023 Glamo, LLC All Rights Reserved</p>
      </div>
      <div>
        <Link to="pages/promo-terms-and-conditions">PromoT&Cs</Link>
        <Link to="pages/privacy-policy">Privacy Policy</Link>
        <Link to="pages/terms-of-service">Terms Of Service</Link>
        <Link to="pages/privacy-policy#donotsell">
          DO Not Sell My Information
        </Link>
      </div>
    </section>
  );
}


export default Footer_Copyright