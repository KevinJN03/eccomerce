import Filter from './Filter';
import '../../CSS/product_page.css';
import Collection from './Collection/collection';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import Mobile_Filter from './Filter/mobile-filter';

import { useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
function Product_Page() {
    const [filterCount, setFilterCount] = useState(0);

    const screenSize = useWindowSize()

    console.log(screenSize.width)
    return (
        <section id="product_page">
            <section className="product-page-section flex w-full max-w-[1366px] flex-col sm:px-5 md+lg:!px-10">
                <div className="product-header mb-4 flex flex-col md+lg:gap-4 sm:gap-2">
                    <div className="links flex flex-row items-center gap-2 md+lg:text-xs">
                        <p>Women</p> <NavigateNextSharpIcon fontSize="2" />{' '}
                        <p>Activewear</p>
                        <NavigateNextSharpIcon fontSize="2" />
                        <p>Women's Activewear Tops</p>
                        
                    </div>
                    <div className="middle flex flex-row sm+md:justify-between items-center">
                    <h2 className="md+lg:text-4xl sm:text-2xl sm:w-28 font-black tracking-tight">
                                            WOMEN'S ACTIVEWEAR TOPS
                                        </h2>
                                        {
                                            screenSize.width < 800 && <>
                                            <label htmlFor="modal-2" className='lg:hidden flex flex-nowrap gap-2 items-center border-[1px] px-3 py-2 rounded-full border-[var(--primary)] hover:border-2'>
                                            <TuneRoundedIcon className='sm:!text-xl md:!text-3xl'/>
                                            <p className='md:text-xl'>Filter
                                                </p>
                                        </label>
                                        <Mobile_Filter filterCount={filterCount} setFilterCount={setFilterCount}/>
                                            </>
                                        }
                                        
                    </div>
                    
                    <div className="bottom">
                            <button className="category-filter-btn">ActiveWear</button>
                            <button className="category-filter-btn">Active Tops</button>
                            <button className="category-filter-btn">Sports Bras</button>
                            <button className="category-filter-btn">Active Jackets</button>

                            {/* test */}

                            <button className="category-filter-btn">ActiveWear</button>
                            <button className="category-filter-btn">Active Tops</button>
                            <button className="category-filter-btn">Sports Bras</button>
                            <button className="category-filter-btn">Active Jackets</button>
                        </div>
                </div>
                <section className="product-page-wrapper">
                    <Filter filterCount={filterCount} setFilterCount={setFilterCount}/>
                    <Collection />
                </section>
            </section>
        </section>
    );
}

export default Product_Page;
