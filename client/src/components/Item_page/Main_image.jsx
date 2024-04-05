import { forwardRef } from 'react';

import { useWindowSize } from '@uidotdev/usehooks';
import { useProductContext } from '../../context/productContext';
const Main_Image = forwardRef(function Main_Image({}, ref) {
    const screenSize = useWindowSize();
    const { loading, product } = useProductContext();
    return (
        <>
            {loading ? (
                <div id="main_image" className="skeleton-pulse h-full"></div>
            ) : (
                <section id="main_image">
                    {screenSize.width > 980 ? (
                        <img
                            src={product?.images?.[0]}
                            ref={ref}
                            className="h-full w-full object-center md:w-[300px] sm+md:object-contain lg:object-cover"
                        />
                    ) : (
                        <>
                            {product?.images?.map((image, index) => {
                                return (
                                    <img
                                        src={image}
                                        key={index}
                                        className="h-full w-full object-center sm:w-[200px] md:w-[300px] sm+md:object-contain lg:object-cover"
                                    />
                                );
                            })}
                        </>
                    )}
                </section>
            )}
        </>
    );
});

export default Main_Image;
