import Filter from './Filter';
import '../../CSS/product_page.css';
import Collection from './Collection/collection';

import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import Mobile_Filter from './Filter/mobile-filter';

import { useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import Navigation_Links from './navigationLinks';
import axios from '../../api/axios'
import { Outlet } from 'react-router-dom';
import { useGenderCategory } from '../../hooks/genderCategory';
function Product_Page() {
    const [filterCount, setFilterCount] = useState(0);
    const [state, dispatch] = useGenderCategory()
  const [products, setProducts] = useState([])


    useEffect(() => {
        axios.get(`/category/${state.productCategory}/${state.gender}`).then((res)=> {
            let lowerCaseGender = state.gender.toLowerCase();
            console.log("data response: ", res.data[lowerCaseGender])
            setProducts(res.data[lowerCaseGender])
        }).catch(err => {
            console.log("err at product fetch: ", err)
        })
       
        
    }, [state]);


    const screenSize = useWindowSize();

    return (
        <section id="product_page">
            <section className="product-page-section flex w-full max-w-[1366px] flex-col sm:px-5 md+lg:!px-10">
                <div className="product-header mb-4 flex flex-col sm:gap-2 md+lg:gap-4">
                    <Navigation_Links />
                    <div className="middle flex flex-row items-center sm+md:justify-between">
                        <h2 className="font-black tracking-tight sm:w-28 sm:text-2xl md+lg:text-4xl">
                            {/* WOMEN'S ACTIVEWEAR TOPS */}
                            {state.gender.toUpperCase() + "'S" + ' ' +  state.productCategory.toUpperCase()}
                        </h2>
                        {screenSize.width < 800 && (
                            <>
                                <label
                                    htmlFor="modal-2"
                                    className="flex flex-nowrap items-center gap-2 rounded-full border-[1px] border-[var(--primary)] px-3 py-2 hover:border-2 lg:hidden"
                                >
                                    <TuneRoundedIcon className="sm:!text-xl md:!text-3xl" />
                                    <p className="md:text-xl">Filter</p>
                                </label>
                                <Mobile_Filter
                                    filterCount={filterCount}
                                    setFilterCount={setFilterCount}
                                />
                            </>
                        )}
                    </div>

                    <div className="bottom">
                        <button className="category-filter-btn">
                            ActiveWear
                        </button>
                        <button className="category-filter-btn">
                            Active Tops
                        </button>
                        <button className="category-filter-btn">
                            Sports Bras
                        </button>
                        <button className="category-filter-btn">
                            Active Jackets
                        </button>

                        {/* test */}

                        <button className="category-filter-btn">
                            ActiveWear
                        </button>
                        <button className="category-filter-btn">
                            Active Tops
                        </button>
                        <button className="category-filter-btn">
                            Sports Bras
                        </button>
                        <button className="category-filter-btn">
                            Active Jackets
                        </button>
                    </div>
                </div>
                <section className="product-page-wrapper">
                    <Filter
                        filterCount={filterCount}
                        setFilterCount={setFilterCount}
                    />
                    <Collection products={products}/>
                    
                </section>
            </section>
            
        </section>
    );
}

export default Product_Page;
