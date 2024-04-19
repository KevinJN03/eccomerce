import { useNewProduct } from '../../../../../context/newProductContext';

import OptionError from './variation/error/optionError';
import _ from 'lodash';
function Description({}) {
    const { description, setDescription, publishErrorDispatch, publishError } =
        useNewProduct();

    const handleOnchange = (e) => {
        const value = _.trim(e.target.value);
        setDescription(() => e.target.value);

        if (value.length == 0) {
            publishErrorDispatch({
                type: 'ADD',
                path: 'description',
                msg: `Description can't be empty.`,
            });
        } else {
            publishErrorDispatch({ type: 'CLEAR', path: 'description' });
        }
    };
    return (
        <section id="Description">
            <p className="text-lg font-medium">
                Description<span className="asterisk">*</span>
            </p>
            <p>
                What makes your item special? Buyers will only see the first few
                lines unless they expand the description.
            </p>

            <section className="w-full ">
                <textarea
                    onChange={handleOnchange}
                    value={description}
                    className={`input mt-4 min-h-[200px] w-full min-w-full rounded-lg border-black p-3 text-sm ${publishError?.description ? '!border-red-700 bg-red-100' : ''}`}
                />
            </section>
            {publishError?.description && (
                <OptionError
                    msg={publishError.description}
                    className={'!mb-[-8px] px-0  py-0 pt-1'}
                />
            )}
        </section>
    );
}

export default Description;
