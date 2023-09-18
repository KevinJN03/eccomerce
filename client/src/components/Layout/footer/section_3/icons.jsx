import instagram from '../../../../assets/footer-icons/instagram.svg';
import tiktok from '../../../../assets/footer-icons/tiktok.svg';
import youtube from '../../../../assets/footer-icons/youtube.svg';
import snapchat from '../../../../assets/footer-icons/snapchat.svg';
import facebook from '../../../../assets/footer-icons/facebook.svg';
import pinterest from '../../../../assets/footer-icons/pinterest.svg';
function Icons() {
    const all_icons = [
        instagram,
        tiktok,
        youtube,
        snapchat,
        facebook,
        pinterest,
    ];

    return (
        <section id="footer-icons-section">
            {all_icons.map((icon) => {
                return (
                    <div
                        key={all_icons.indexOf(icon)}
                        id="footer-icons"
                        className="h-6 w-6"
                    >
                        <img
                            loading="lazy"
                            src={icon}
                            className="h-full w-full"
                        />
                    </div>
                );
            })}
        </section>
    );
}

export default Icons;
