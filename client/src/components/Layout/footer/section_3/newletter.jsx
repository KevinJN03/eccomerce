import arrow from "../../../../assets/footer-icons/right-arrow.png";

function Newsletter() {
  return (
    <section id="newsletter">
      <p>SIGN UP FOR DISCOUNTS + UPDATES</p>
      <div id="newsletter-input" className="h-20 flex flex-row items-center w-full relative">
        <input type="text" placeholder="Phone Number or Email" className="h-full w-full"/>
        <button type="button" className="newletter-btn">
          <img src={arrow} className="w-full h-full"/>
        </button>
      </div>
      <div className="max-w-md">
        <p>
        By signing up for email, you agree to Glamo's Terms of Service
        and Privacy Policy. By signing up via text, you agree to receive
        marketing text messages from Glamo. We may use information
        collected about you on our site to suggest other products and offers.
        You can unsubscribe at any time by replying STOP to our text. View Terms
        & Privacy.
      </p>
      </div>
      
    </section>
  );
}

export default Newsletter;
