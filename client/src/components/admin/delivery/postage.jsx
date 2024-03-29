import { useState } from 'react';
import CustomForm from './customForm';
import Labels from './labels';
import { ArrowDropDown } from '@mui/icons-material';

function Input({ asterisk, optional, label, inputId, children, maxlength }) {
    return (
        <div className="flex w-full flex-1 flex-col gap-2">
            <label className="font-semibold" htmlFor={inputId}>
                {label}{' '}
                {asterisk ? (
                    <span className="text-lg text-red-800">*</span>
                ) : (
                    optional && (
                        <span className=" text-lg font-normal">(optional)</span>
                    )
                )}
            </label>
            <div className="relative w-full">
                <input
                    maxLength={maxlength}
                    type="text"
                    name={inputId}
                    id={inputId}
                    className="shadow-inner-2 daisy-input daisy-input-bordered w-full border-dark-gray"
                />

                {children}
            </div>
        </div>
    );
}
function Postage({}) {
    const [format, setFormat] = useState('1 label per page');
    const [customForm, setCustomForm] = useState(
        'Prefill item description with my listing title'
    );
    return (
        <section className="flex flex-col gap-8">
            <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Dispatching From</h2>

                <Input label={'Full name'} inputId={'full-name'} asterisk />

                <section className="flex w-full flex-nowrap items-center gap-4">
                    <Input
                        label={'Street address'}
                        inputId={'street-address'}
                        asterisk
                    />
                    <Input
                        label={' Flat / Other'}
                        inputId={'address-2'}
                        optional
                    />
                </section>

                <section className=" flex w-full flex-nowrap gap-4">
                    <Input label={'City'} inputId={'city'} asterisk />
                    <Input label={'County'} inputId={'county'} optional />

                    <Input
                        label={'Post code'}
                        inputId={'post-code'}
                        maxlength={9}
                        asterisk
                    >
                        <ArrowDropDown className="absolute right-3 top-1/2 translate-y-[-50%]" />
                    </Input>
                </section>
                <Input
                    label={'Phone number'}
                    inputId={'phone-number'}
                    asterisk
                />
            </section>

            <section  className='flex flex-col gap-4'>
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
                            Choose a postage label preset to prefill package
                            details for each order. Presets are helpful if you
                            consistently dispatch items of a similar size and
                            weight, and use the same type of package.
                        </p>
                        <section className="border-b-2 py-6">
                            <h2 className="mb-4 text-base font-semibold">
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
                            <h2 className="mb-4 text-base font-semibold">
                                International packages
                            </h2>

                            <div className="flex cursor-pointer flex-nowrap items-center gap-2">
                                <input
                                    readOnly
                                    checked
                                    type="radio"
                                    className="daisy-radio daisy-radio-lg"
                                    name="international"
                                />
                                <p className="text-base">(No Default)</p>
                            </div>
                        </section>
                    </div>
                </section>
            </section>

            <footer className="mt-6 flex w-full justify-end border-t-2 pb-12 pt-8">
                <button
                    type="button"
                    className="rounded-full bg-black px-5 py-3 text-white text-base font-medium"
                >
                    Save preferences
                </button>
            </footer>
        </section>
    );
}

export default Postage;
