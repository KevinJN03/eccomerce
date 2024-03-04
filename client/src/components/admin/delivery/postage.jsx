import { useState } from 'react';
import CustomForm from './customForm';
import Labels from './labels';

function Postage({}) {
    const [format, setFormat] = useState('1 label per page');
    const [customForm, setCustomForm] = useState(
        'Prefill item description with my listing title'
    );
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Dispatching From</h2>

            <h1 className="text-2xl font-semibold">
                Postage label preferences
            </h1>

            <p className="text-base">
                Set your postage label preferences to streamline your order
                fulfilment process.
            </p>

            <section className=" grid  w-full grid-cols-2 gap-4">
                <Labels {...{ format, setFormat }} />

                <CustomForm {...{ setCustomForm, customForm }} />
                <div className="flex w-full flex-col  rounded-lg border border-dark-gray p-5">
                    <h2 className="text-lg font-semibold">
                        Default label presets
                    </h2>

                    <p>
                        Choose a postage label preset to prefill package details
                        for each order. Presets are helpful if you consistently
                        dispatch items of a similar size and weight, and use the
                        same type of package.
                    </p>
                    <section className="border-b-2 py-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Domestic packages
                        </h2>
                        <div className="flex cursor-pointer flex-nowrap items-center gap-2">
                            <input
                                readOnly
                                checked
                                type="radio"
                                className="daisy-radio daisy-radio-lg"
                                name="domestic"
                            />
                            <p className="text-base">(No Default)</p>
                        </div>
                    </section>

                    <section className="border-b-2 py-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            International packages
                        </h2>

                        <div className="flex cursor-pointer flex-nowrap items-center gap-2">
                            <input
                                readOnly
                                checked
                                type="radio"
                                className="daisy-radio daisy-radio-lg"
                                name="domestic"
                            />
                            <p className="text-base">(No Default)</p>
                        </div>
                    </section>
                </div>
            </section>


            <footer className='w-full border-t-2 mt-6 flex justify-end pt-8 pb-12'>
<button type="button" className='text-white bg-black py-3 px-5 rounded-full'>
    Save preferences
</button>
            </footer>
        </section>
    );
}

export default Postage;
