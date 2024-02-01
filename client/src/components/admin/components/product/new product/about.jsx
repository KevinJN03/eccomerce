import DragDropFile from './dragDropFile';
import New_Product_Header from './header';
import { useNewProduct } from '../../../../../context/newProductContext';
import useNewProductError from '../../../../../useNewProductError';

import { useRef, useEffect, useState } from 'react';
import Description from './description';
import OptionError from './variation/error/optionError';
import { useInView } from 'framer-motion';
import useHighlightSection from '../../../../../hooks/useScrollpsy';
function About() {
    const {
        title,
        setTitle,
        publishError,
        files,
        publishErrorDispatch,
        setCurrentSection,
        currentSection,
    } = useNewProduct();
    const [titleError, setTitleError] = useState('');
    const [filesError, setFilesError] = useState('');

    useNewProductError('title', setTitleError);
    useNewProductError('files', setFilesError);

    useEffect(() => {
        setTitleError('');
        publishErrorDispatch({ type: 'clear', path: 'title' });
    }, [title]);

    useEffect(() => {
        setFilesError('');
        publishErrorDispatch({ type: 'clear', path: 'files' });
    }, [files]);

    return (
        <section className="new-product-wrapper">
            <div className="about" id="about">
                <New_Product_Header
                    title={'About'}
                    text="Tell the world all about your item and why they’ll love it."
                />
                <section id="about-form" className="mt-6">
                    <label htmlFor="title" className="text-lg font-medium">
                        Title<span className="asterisk">*</span>
                    </label>
                    <p>
                        Include keywords that buyers would use to search for
                        this item.
                    </p>
                    {titleError && (
                        <OptionError
                            className={'!m-0 px-0 pb-0 pt-2'}
                            msg={titleError}
                        />
                    )}
                    <input
                        type="text"
                        id="title"
                        max={140}
                        min={1}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`input ${titleError ? 'bg-red-100' : ''}`}
                    />
                </section>

                <section className="mb-4">
                    <p className="text-lg font-medium">
                        Photo<span className="asterisk">*</span>
                    </p>
                    <p className="mb-2">Add up to 6 photos</p>
                    {filesError && (
                        <OptionError
                            className={'!m-0 px-0 py-2'}
                            msg={filesError}
                        />
                    )}
                    <DragDropFile filesError={filesError} />
                </section>

                <Description />
            </div>
        </section>
    );
}

export default About;
