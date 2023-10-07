import DragDropFile from './dragDropFile';
import New_Product_Header from './header';
import { useNewProduct } from '../../../../../context/newProductContext';


import { useState } from 'react';
import Description from './description';
function About() {

    const {title, setTitle} = useNewProduct()

    return (
        <section className='new-product-wrapper'>

        <div className="about">
            <New_Product_Header
                title={'About'}
                text="Tell the world all about your item and why they’ll love it."
            />
            <form id="about-form" className="mt-6">
                <label htmlFor="#title" className="text-lg font-medium">
                    Title<span className="asterisk">*</span>
                </label>
                <p>
                    Include keywords that buyers would use to search for this
                    item.
                </p>
                <input type="text" id="title" max={140} min={1} value={title} onChange={(e) => setTitle(e.target.value)} />
            </form>

            <form className='mb-4'>
                <label htmlFor="#photo" className="text-lg font-medium">
                    Photo<span className="asterisk">*</span>
                </label>
                <p className='mb-2'>Add up to 6 photos</p>
               <DragDropFile  />

            </form>
            
            <Description/>
        </div>
        
        </section>
    );
}

export default About;
