import Collection from '../product/Collection/collection.jsx';
import { useWindowSize } from '@uidotdev/usehooks';
function Recommended({ products, loading }) {
    return (
        // <section className="recommend-wrapper border-t-2 w-screen">
        <section id="Recommended" className="flex flex-col ">
            <div className="divider w-screen self-center"></div>
            <h1 className="mx-3 mb-4 font-gotham text-xl font-bold text-[var(--primary)] sm:mx-5 sm:text-lg sm:font-semibold md:ml-8">
                YOU MIGHT ALSO LIKE
            </h1>
            <Collection products={products} loading={loading} />
            <div className="load-more-btn-wrapper my-6 flex w-full items-center justify-center"></div>
        </section>
        // {/* </section> */}
    );
}

export default Recommended;
