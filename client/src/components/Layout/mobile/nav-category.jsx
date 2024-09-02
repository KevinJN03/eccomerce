import { v4 as uuidv4 } from 'uuid';
const menImg = Object.entries(
    import.meta.glob('../../../assets/menu-bar-images/men/*.png')
).map((entry) => entry[0]);
const womenImg = Object.entries(
    import.meta.glob('../../../assets/menu-bar-images/women/*.png')
).map((entry) => entry[0]);
import img1 from '../../../assets/menu-bar-images/men/img1.png';
import Nav_Banner from './nav-banner';

menImg.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0]);
    const numB = parseInt(b.match(/\d+/)[0]);

    return numA - numB;
});
womenImg.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0]);
    const numB = parseInt(b.match(/\d+/)[0]);

    return numA - numB;
});

function Nav_Category({ category, handleClick }) {
    let counter = 0;
    const newUrl = (image, index) => {
        let url = new URL(image[index], import.meta.url).href;
        // counter++;

        return url;
    };
    const categoryNavs = [
        { title: 'HOME', small: true, home: true },
        { title: 'NEW IN' },
        { title: 'CLOTHING' },
        { title: 'SHOES' },
        { title: 'TRAINERS' },
        { title: 'ACCESORIES' },
        { title: 'SPORTSWEAR' },
        { title: 'SUMMER' },
        { title: 'BRANDS' },
        { title: 'FACE + BODY' },
        { title: 'MARKETPLACE' },
        { title: 'OUTLET' },
    ];

    return (
        <section className="nav-category">
            {categoryNavs.map((banner, idx) => {
                return (
                    <Nav_Banner
                        key={uuidv4()}
                        title={banner.title}
                        small={banner.small || false}
                        home={banner.home || false}
                        img={
                            category
                                ? newUrl(menImg, idx)
                                : newUrl(womenImg, idx)
                        }
                        handleClick={handleClick}
                    />
                );
            })}
        </section>
    );
}

export default Nav_Category;
