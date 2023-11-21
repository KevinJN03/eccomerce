import Item from './item';
import { AnimatePresence, motion } from 'framer-motion';
import variants from '../../common/framerMotionVariants';
function Collection({ products, loading }) {
    return (
        <motion.section id="collection-section">
            {!loading ? (
                <>
                    {products.map((product) => {
                        return (
                            <Item
                                key={product._id}
                                image={product.images[0]}
                                price={
                                    product?.price?.current ||
                                    product?.minVariationPrice
                                }
                                title={product.title}
                                url={product._id}
                            />
                        );
                    })}
                </>
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
