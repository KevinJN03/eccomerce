import '../../CSS/item_page.css';
import Main_Image from './Main_image';
import Item_List from './image_list';
import Product_info from './product_info';
import Recommended from './reccommended';
import Reviews from './reviews';
import exampleData from './exampleData';
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import Navigation_Links from '../product/navigationLinks';
import { useParams, useLocation } from 'react-router-dom';
import { useProducts } from '../../hooks/ScrapeData/scrape';

function filterProduct(products, id) {
    // const [singleItem, setSingleItem] = useState(null);
    // const [stop, setStop] = useState(false)
    // useEffect(() => {
        let filtered = products.map((category) => {
            // console.log(category.category)
            return { ...category.products };
  
            // ))
        });
        // console.log("filtered",filtered)
        let singleItem ={};

        for (let i = 0; i < filtered.length;  i++) {
            // console.log("for loop", filtered[i]);
            const eachCategory = Object.values(filtered[i]);
            for (let x = 0; x < eachCategory.length ; x++) {
                console.log('2nd loop', eachCategory[x]);
                if (
                    eachCategory[x] && 
                    eachCategory[x].id &&
                    eachCategory[x].id == id
                ) {
                    // console.log('this is the one', eachCategory[x] && stop != true);
                    // setSingleItem(eachCategory[x]);
                    console.log("single", eachCategory[x])
                    singleItem = eachCategory[x]
                    break
                    
                } 
            }
        }  

 
    //     return () => {
    //         setSingleItem(null);  
    //         setStop(false)
    //     }
    // }, []);

    console.log('singleItem', singleItem);
    return singleItem; 
}

 function ItemPage() {  
    // console.log("Function Body")
    
    const [state, dispatch] = useProducts(); 
    const products = state.products.categoryResults;
        
    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState(filterProduct(products, id));
    console.log("singleProduct: ", singleProduct)
    const [loading, setLoading] = useState(false);
    
    function getRoute(){
        const { id } = useParams();
       const route = location.pathname.split('/')[1];
    console.log("path", route)   
    }  

    // let singleItem = filterProduct(products, id);

    useEffect(()=> {
    }, [])
    // filterProduct(products, id)    
    // dispatch({ type: route }); 
    // useEffect(() => { 
        
        // const timeout = setTimeout(() => {
        // dispatch({type: route}) 
        //     setSingleProduct(filterProduct(products, id));
        //     setLoading(false);
        // });

        // return () => { 
            // setLoading(true);
            // clearInterval(timeout); 
            // setSingleProduct(null);
    //     };
    // }, []);
    function Loader() {
        return <span className="loading loading-infinity loading-lg"></span>;
    }

    
    const example = exampleData;
    const imageRef = useRef(null);
    const handleImgChange = (e) => {
        imageRef.current.src = e.target.src
            ? e.target.src
            : imageRef.current.src;
    };
    return (
        <>
            {loading ? (  
                Loader()
            ) : (
                <section className="item-page-wrapper">
                    <section id="item-page">
                        <Navigation_Links className="mt-3 pl-3" />
                        <section className="item-section">
                            <Item_List
                                images={example.image}
                                handleImgChange={handleImgChange}
                            />
                            <Main_Image ref={imageRef} images={example.image} />
                            <Product_info
                                price={example.price}
                                text={example.text}
                                title={example.title}
                                size={example.size}
                                details={example.details}
                                images={example.similar_styles_images}
                                style_it_with_image={
                                    example.style_it_with_image
                                }
                                product={example}

                            />
                        </section>
                        <Reviews product={example} />
                        <div className=" item-page-divider border-5 w-full sm+md:mb-10 lg:!hidden"></div>
                        <Recommended />
                    </section>
                </section>
            )}
        </>
    );
}

export default ItemPage;
 