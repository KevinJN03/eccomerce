import apple_badge from '../../../assets/download-icon/apple-store-badge.png';
import google_badge from '../../../assets/download-icon/google-play-badge (2).png';

function Section_1() {
    return (
        <section className="footer-badge">
            <p className="mb-2 font-bold">SHOP FASTER WITH THE APP</p>
            <section className="flex flex-row flex-nowrap gap-2">
                <div id="apple-badge" className="badge-icon  ">
                    <img
                        src={apple_badge}
                        alt="apple download on the store badge"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div id="google-badge" className="badge-icon">
                    <img
                        src={google_badge}
                        alt="get it on google play badge"
                        className="google-badge h-full w-full object-fill"
                    />
                </div>
            </section>
        </section>
    );
}
export default Section_1;
