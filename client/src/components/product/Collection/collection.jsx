import Item from './item.jsx';
import { motion } from 'framer-motion';
import variants from '../../common/framerMotionVariants.jsx';
function Collection({ products, loading }) {
    return (
        <motion.section className="flex-[2_2_80%] sm:mx-3 sm+md:gap-x-3 sm+md:gap-y-5 lg:gap-x-3 lg:gap-y-4 md+lg:mx-5">
            {!loading ? (
                <section className="flex flex-row !flex-wrap !gap-5 ">
                    {products.map((product) => {
                        return <Item product={product} key={product._id} />;
                    })}
                </section>
            ) : (
                <>
                    {new Array(6).fill(1).map((item, idx) => {
                        return (
                            <motion.div
                                key={idx}
                                className="card"
                                variants={variants}
                                animate={'animate'}
                                initial={'initial'}
                                exit={'exit'}
                            >
                                <div className="skeleton-pulse h-full min-h-[200px] w-full"></div>
                            </motion.div>
                        );
                    })}
                </>
            )}
        </motion.section>
    );
}

export default Collection;
