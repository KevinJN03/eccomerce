import { useState } from "react";
import Drawer from "../common/drawer.jsx"
function Reviews({product}) {
    
    return (
        <section className="reviews">
            <div className="lg:mb-28 sm+md:mb-10 flex w-11/12 flex-row items-center justify-between rounded-lg bg-gray-100 px-4 py-6">
                <div>
                    <h2 className="text-xl font-bold sm:font-semibold sm:text-lg">No reviews yet</h2>
                    <p>Be the first to write a review.</p>
                </div>
                <div>
                    <label htmlFor="drawer-right"
                        id="review-btn"
                        className="border-[thin] rounded-full  bg-white px-6 py-3 sm:px-4 sm:text-sm font-semibold text-black whitespace-nowrap"
                        onClick={()=> handleClick()}
                    >
                        Write a Review
                    </label>
                    <Drawer product={product}/>
                 
                </div>
            </div>
        </section>
    );
}

export default Reviews;
