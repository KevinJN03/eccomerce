import { v4 as uuidv4 } from 'uuid';
import { Fragment } from 'react';
function SaleBanner_4({ images }) {
    return (
        <section id="section-1">
            {images.map((img) => {
                return (
                    <Fragment key={uuidv4()}>
                        <div
                            id="section-1-wrapper"
                            className=" relative h-full"
                        >
                            <img
                                src={img.url}
                                className="h-full w-full object-cover object-center"
                                loading="lazy"
                            />
                            <div
                                className={`salebanner4-text absolute font-bold`}
                            >
                                {/* {img.text ? img.text : ''} */}
                                <img
                                    loading="lazy"
                                    src={img.src}
                                    className="h-full w-full "
                                />
                            </div>
                        </div>
                    </Fragment>
                );
            })}
        </section>
    );
}

export default SaleBanner_4;
