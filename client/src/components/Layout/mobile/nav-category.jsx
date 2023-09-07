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

function Nav_Category({ category }) {
    let counter = 0;
    const newUrl = (image) => {
        let url = new URL(image[counter], import.meta.url).href;
        counter++;

        return url;
    };

    const Category = [
        <Nav_Banner
            title={'HOME'}
            small={true}
            img={category ? newUrl(menImg) : newUrl(womenImg)}
        />,
        <Nav_Banner
            title={'NEW IN'}
            img={category ? newUrl(menImg) : newUrl(womenImg)}
        />,
        <Nav_Banner
            title={'CLOTHING'}
            img={category ? newUrl(menImg) : newUrl(womenImg)}
        />,
        <Nav_Banner
            title={'SHOES'}
            img={category ? newUrl(menImg) : newUrl(womenImg)}
        />,
        <Nav_Banner
            title={'TRAINERS'}
            img={category ? newUrl(menImg) : newUrl(womenImg)}
        />,
        <Nav_Banner
            title={'ACCESORIES'}
            img={category ? newUrl(menImg) : newUrl(womenImg)}
        />,
        <Nav_Banner
            title={'SPORTSWEAR'}
            img={category ? newUrl(menImg) : newUrl(womenImg)}
        />,
        <Nav_Banner
            title={'SUMMER'}
            img={category ? newUrl(menImg) : newUrl(womenImg)}
        />,
        <Nav_Banner
            title={'BRANDS'}
            img={category ? newUrl(menImg) : newUrl(womenImg)}
        />,
        <Nav_Banner
            title={'FACE + BODY'}
            img={category ? newUrl(menImg) : newUrl(womenImg)}
        />,
        <Nav_Banner
            title={'MARKETPLACE'}
            img={category ? newUrl(menImg) : newUrl(womenImg)}
        />,
        <Nav_Banner
            title={'OUTLET'}
            img={category ? newUrl(menImg) : newUrl(womenImg)}
        />,
    ];

    return (
        <section className="nav-category">
            {Category.map((banner) => {
                return <div key={uuidv4()}>{banner}</div>;
            })}
        </section>
    );
}

export default Nav_Category;
