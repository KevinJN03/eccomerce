import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
function Section_1({ images }) {
    return (
        <section id="section-1" className="section-1 ">
            {images.map((img) => {
                return (
                    <Fragment key={uuidv4()}>
                        <div id="section-1-wrapper" className="relative h-full">
                            <img
                                src={img.url}
                                className="h-full w-full object-cover object-center"
                            />
                            <h3 className="bottom-text absolute font-bold">
                                {img.text ? img.text : ''}
                            </h3>
                        </div>
                    </Fragment>
                );
            })}
        </section>
    );
}

export default Section_1;
