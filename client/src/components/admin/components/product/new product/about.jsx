import DragDropFile from './dragDropFile';
import { useState, useRef } from 'react';
import New_Product_Header from './header';

function About() {
    return (
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
                <input type="text" id="title" max={140} min={1} />
            </form>

            <form className='mb-4'>
                <label htmlFor="#photo" className="text-lg font-medium">
                    Photo<span className="asterisk">*</span>
                </label>
                <p>Add up to 6 photos</p>
               <DragDropFile  />

            </form>
            
            <form>
                <label htmlFor="#description" className="text-lg font-medium">
                    Description<span className="asterisk">*</span>
                </label>
                <p>
                    What makes your item special? Buyers will only see the first
                    few lines unless they expand the description.
                </p>
                <textarea
                    name="description"
                    id="description"
                    className='!min-h-[200px]'
                
                ></textarea>
            </form>
        </div>
    );
}

export default About;
