function Banner() {
  return (
    <>
      <section id="banner" className="flex flex-row w-full justify-center">
        <div id="promo" className="w-full pb-4 background-color-pink">
          <p id="banner-text">
            <strong>
              UP TO 30% OFF ALMOST EVERYTHING*
              <br></br>
              *Mystery discount revealed @ checkout With Code: SURPISE
            </strong>
          </p>
        </div>
        <div id="promo" className="w-full pb-4">
          <p id="banner-text">
            <span>
              <strong>GLAMO PREMIER</strong>
            </span>
            <br></br>
            Unlimited free Next day Delivery for a whole year for £9.95.
          </p>
        </div>
      </section>
      <div id="discount" className="w-full flex justify-center background-color-pink">
        <div className="text-center	py-10 ">
          <h2>UP TO</h2>
          <h1>305 OF ALOST EVERTYTHING!*</h1>
          <h4>*Mystery* discount revealed @ checkout </h4>
          <h4>
            With code : <span>SURPRISE</span>
          </h4>
          <p>
            *Minimum spend of £20 applies. See website banner for full Ts&Cs.
            Selected marked products excluded from promo.
          </p>
        </div>
      </div>
    </>
  );
}

export default Banner;
