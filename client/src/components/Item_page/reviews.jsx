import { useState } from 'react';
import Drawer from '../common/drawer.jsx';
function Reviews({ product }) {
    return (
        <section className="reviews">
            <div className="flex w-11/12 flex-row items-center justify-between rounded-lg bg-gray-100 px-4 py-6 sm+md:mb-10 lg:mb-28">
                <>
                    <div>
                        <h2 className="text-xl font-bold sm:text-lg sm:font-semibold">
                            No reviews yet
                        </h2>
                        <p>Be the first to write a review.</p>
                    </div>
                    <div>
                        <label
                            htmlFor="drawer-right"
                            id="review-btn"
                            className="whitespace-nowrap rounded-full  border-[thin] bg-white px-6 py-3 font-semibold text-black sm:px-4 sm:text-sm"
                            // onClick={() => handleClick()}
                        >
                            Write a Review
                        </label>
                        <Drawer product={product} />
                    </div>
                </>
            </div>
        </section>
    );
}

export default Reviews;
