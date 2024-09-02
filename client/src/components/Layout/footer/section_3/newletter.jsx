import arrow from '../../../../assets/footer-icons/right-arrow.png';

function Newsletter() {
    return (
        <section id="newsletter">
            <p className="mb-2 text-sm font-bold sm:text-xs">
                SIGN UP FOR DISCOUNTS + UPDATES
            </p>
            <div
                id="newsletter-input"
                className="relative flex h-14 w-full flex-row items-center rounded-l-lg "
            >
                <input
                    type="text"
                    placeholder="Phone Number or Email"
                    className="h-full w-11/12 rounded-inherit px-3 text-sm text-black"
                />
                <div id="newletter-btn-container">
                    <button
                        type="button"
                        className="h-8 w-8  rounded-full bg-slate-200 p-2 transition-all hover:bg-slate-300"
                    >
                        <img
                            src={arrow}
                            className="h-full w-full object-cover"
                        />
                    </button>
                </div>
            </div>
            <div className="mt-4 w-full">
                <p className="text-s font-light">
                    By signing up for email, you agree to Glamo's Terms of
                    Service and Privacy Policy. By signing up via text, you
                    agree to receive marketing text messages from Glamo. We may
                    use information collected about you on our site to suggest
                    other products and offers. You can unsubscribe at any time
                    by replying STOP to our text. View Terms & Privacy.
                </p>
            </div>
        </section>
    );
}

export default Newsletter;
