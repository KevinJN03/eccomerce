import DragDropFile from './dragDropFile';
import New_Product_Header from './header';
import { useNewProduct } from '../../../../../context/newProductContext';

import Description from './description';
import OptionError from './variation/error/optionError';

import _ from 'lodash';
function About() {
    const { title, setTitle, publishError, publishErrorDispatch } =
        useNewProduct();

    const handleTitleOnchange = (e) => {
        const value = _.trim(e.target.value);
        setTitle(() => e.target.value);
        let error = null;

        if (e.target.value[0] == ' ') {
            error =
                'The first character of your title must be a letter or a number.';
        } else if (value.length == 0 || value.length > 140) {
            error = 'Please enter a title between 1 and 140 characters long.';
        }

        if (error) {
            publishErrorDispatch({
                type: 'ADD',
                path: 'title',
                msg: error,
            });
        } else {
            publishErrorDispatch({ type: 'CLEAR', path: 'title' });
        }
    };
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

                    <section className="mb-4 w-full">
                        <label className="daisy-form-control w-full">
                            <input
                                type="text"
                                max={140}
                                min={1}
                                value={title}
                                onChange={handleTitleOnchange}
                                className={`${publishError?.title ? '!border-red-700 bg-red-100 ' : ''} daisy-input daisy-input-bordered input !mb-0 w-full `}
                            />
                            <div className="daisy-label !m-0 !p-0">
                                <span className="daisy-label-text-alt">
                                    {publishError?.title && (
                                        <OptionError
                                            className={'!m-0 px-0 pb-0 pt-2'}
                                            msg={publishError.title}
                                        />
                                    )}
                                </span>
                                <span className={`daisy-label-text-alt mt-2 ${publishError?.title ? '!text-red-800': 'text-black/70'}`}>
                                    {`${title.length}/140`}
                                </span>
                            </div>
                        </label>
                    </section>
                </section>

                <section className="mb-4">
                    <p className="text-lg font-medium">
                        Photo<span className="asterisk">*</span>
                    </p>
                    <p className="mb-2">Add up to 6 photos</p>

                    <DragDropFile />
                </section>

                <Description />
            </div>
        </section>
    );
}

export default About;
