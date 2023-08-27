import { useState } from "react";
import Drawer from "../common/drawer.jsx"
function Reviews({product}) {
    const [showDrawer, setShowDrawer] = useState(false);
    const handleClick =() => {
        setShowDrawer(true)
    }
    return (
        <section className="reviews">
            <div className="mb-28 flex w-11/12 flex-row items-center justify-between rounded-lg bg-gray-100 px-4 py-6">
                <div>
                    <h2 className="text-xl font-bold">No reviews yet</h2>
                    <p>Be the first to write a review.</p>
                </div>
                <div>
                    <label htmlFor="drawer-right"
                        id="review-btn"
                        className="border-1 rounded-3xl border-current bg-white px-6 py-3 text-black"
                        onClick={()=> handleClick()}
                    >
                        Write a Review
                    </label>
                   {showDrawer && <Drawer product={product}/>}
                </div>
            </div>
        </section>
    );
}

export default Reviews;
