import Item from './item';
import { AnimatePresence, motion } from 'framer-motion';
import variants from '../../common/framerMotionVariants';
function Collection({ products, loading }) {
    return (
        <motion.section 
      
        className='md+lg:mx-5 sm:mx-3 sm+md:gap-x-3 sm+md:gap-y-5 lg:gap-y-4 lg:gap-x-3 flex-[2_2_80%]'
        >
            {!loading ? (
                <section className='flex flex-row !gap-5 !flex-wrap '>
                    {products.map((product) => {
                        return (
                            <Item
                            product={product}
                                key={product._id}
                                image={product.images}
                                price={
                                    product?.price?.current ||
                                    product?.minVariationPrice
                                }
                                title={product.title}
                                url={product._id}
                            />
                        );
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
