import { forwardRef } from 'react';

import { useWindowSize } from '@uidotdev/usehooks';
const Main_Image = forwardRef(function Main_Image({ images }, ref) {
    const screenSize = useWindowSize();

    return (
        <section id="main_image">
            {screenSize.width > 980 ? (
                <img
                    src={images[0]}
                    ref={ref}
                    className="h-full w-full object-center md:w-[300px] sm+md:object-contain lg:object-cover"
                />
            ) : (
                <>
                    {images.map((image, index) => {
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
    );
});

export default Main_Image;
