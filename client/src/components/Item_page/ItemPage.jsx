import '../../CSS/item_page.css';
import Main_Image from './Main_image';
import Item_List from './image_list';
import Product_info from './product_info';
import Recommended from './reccommended';
import Reviews from './reviews';
function ItemPage() {
    const example = {
        title: 'The Forest Drive Short Sleeve Crew Tee - Cream',
        price: '12.00',
        text: '30% Off! Prices As Marked, No Code Needed',
        image: 'https://www.fashionnova.com/cdn/shop/files/06-30-23Studio7_CB_DJ_11-13-47_41_ZDF01K330031_Cream_7912_MP.jpg?v=1688408862',
        size: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        details: [
            'Available In Dark Brown.',
            'Crew Neck',
            'Short Sleeve',
            '100% Cotton',
            'Imported',
        ],
        similar_styles_images: [
            'https://cdn.shopify.com/s/files/1/0293/9277/files/07-06-23Studio7_ID_DJ_09-38-49_21_ZDF01K330019_Brown_11395_MP.jpg?v=1689117017&width=350',
            'https://cdn.shopify.com/s/files/1/0293/9277/products/02-21-23Studio5_BN_DJ_15-25-50_69_ZDF01K310080_Chocolate_P_19680.jpg?v=1677702161&width=350',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/06-16-23Studio7_DJ_RD_12-58PM_7_FNMBALANCE_Brown_11035_DG.jpg?v=1687544734&width=350',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/07-07-23Studio7_CB_DJ_12-59PM_22_ZDF01K330029_Brown_24963_PLUS_DQ.jpg?v=1689108759&width=350',
        ],
        style_it_with_image: [
            {
                title: 'Rich Gang 3 Piece Chain Necklace - Gold',
                price: '8.00',
                src: 'https://www.fashionnova.com/cdn/shop/products/01-19-23Studio5_RT_DJ_08-22-18_1_1803656_Gold_P_13616_JB_360x.jpg?v=1674523268',
            },
            {
                title: 'Live Free Bracelet - Silver',
                price: '5.00',
                src: 'https://www.fashionnova.com/cdn/shop/products/12-08-22Studio5_RT_SN_09-05-50_9_302369_Silver_0148_SG_360x.jpg?v=1670619542',
            },
            {
                title: 'Nugget Stud Earring Set - Gold',
                price: '5.00',
                src: 'https://www.fashionnova.com/cdn/shop/files/06-12-23Studio7_ID_DJ_1-23PM_23_ER637_Gold_7806_DQ_360x.jpg?v=1687393462',
            },
        ],
    };
const product = {
    img : "https://www.fashionnova.com/cdn/shop/files/07-06-23Studio7_ID_DJ_09-23-39_13_ZDF01K330031_DarkBrown_11321_CM.jpg?v=1689116450",
    title : ""
}
    return (
        <section id="item-page">
            <section className="item-section">
                <Item_List />
                <Main_Image product={example}/>
                <Product_info
                    price={example.price}
                    text={example.text}
                    title={example.title}
                    size={example.size}
                    details={example.details}
                    images={example.similar_styles_images}
                    style_it_with_image={example.style_it_with_image}
                />
            </section>
            <Reviews product={example}/>
            <Recommended />
        </section>
    );
}

export default ItemPage;
