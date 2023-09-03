import Banner from './Banner';
import Carousel from './carousel/carousel';

//import hero image
import hero_img from '../../assets/hero-image/hero.avif';
import hero_img2 from '../../assets/hero-image/hero2.avif';
// import slider image
import img1 from '../../assets/slider_image/image1.avif';
import img2 from '../../assets/slider_image/image2.avif';
import img3 from '../../assets/slider_image/image3.avif';

// Import Images for Section 1
import section_1_image1 from '../../assets/section-1-image/image1.avif';
import section_1_image2 from '../../assets/section-1-image/image2.avif';
import section_1_image3 from '../../assets/section-1-image/image3.avif';
import section_1_image4 from '../../assets/section-1-image/image4.avif';


//Import Images for SaleBanner 4
import sale_banner_4_image1 from '../../assets/sale-banner-4-images/image1.jpg';
import sale_banner_4_image2 from '../../assets/sale-banner-4-images/image2.jpg';
import sale_banner_4_image3 from '../../assets/sale-banner-4-images/image3.jpg';
import sale_banner_4_image4 from '../../assets/sale-banner-4-images/image4.jpg';
import glamo_design from "../../assets/icons/glamo-design.png";
import levi_logo from "../../assets/icons/levi-logo.png"
import ensemble from "../../assets/icons/ensemble2.png"
import infashion from "../../assets/icons/infashion2.png"
import infashion_mod from "../../assets/icons/infashion-modified.png"
// 
import Section_1 from './Section_1';
import Hero from './hero';
import SaleBanner_1 from './salebanner/Salebanner_1';
import SaleBanner_2 from './salebanner/Salebanner_2';
import SaleBanner_3 from './salebanner/salebanner_3';
import SaleBanner_4 from './salebanner/salebanner_4';

function Home() {
    const slides = [
        {
            url: img1,
        },
        { url: img2 },
        { url: img3 },
    ];

    const section_1_images = [
        { url: section_1_image1 },
        { url: section_1_image2, text: 'Nike Life' },
        { url: section_1_image3 },
        { url: section_1_image4, text: 'Sunglasses from £10' },
    ];

    const section_4_images = [
        { url: sale_banner_4_image1, src: glamo_design  },
        { url: sale_banner_4_image2, src: levi_logo},
        { url: sale_banner_4_image3, src: ensemble },
        { url: sale_banner_4_image4, src: infashion },
    ];
    const containerStyles = {
        width: '100%',
        height: '100%',
        margin: '10px auto',
    };

    return (
        <>
            <Banner />
            <div className='carousel-container w-full sm+md:h-80 h-700'>
                <Carousel slides={slides} />
            </div>
            <Section_1 images={section_1_images} />
            <Hero image={hero_img} />
            <SaleBanner_1 />
            <SaleBanner_2 />
            <SaleBanner_3 />
            <SaleBanner_4 images={section_4_images} />
            <Hero image={hero_img2} />
        </>
    );
}

export default Home;
