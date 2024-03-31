import { useEffect, useState } from 'react';
import CustomForm from './customForm';
import Labels from './labels';
import { ArrowDropDown } from '@mui/icons-material';
import ThemeBtn from '../../buttons/themeBtn.jsx';
import { adminAxios } from '../../../api/axios.js';
import PostageContextProvider, {
    usePostageContext,
} from '../../../context/postageContext.jsx';
import UserLogout from '../../../hooks/userLogout.jsx';
import { useDeliveryContext } from '../../../context/deliveryContext.jsx';
import OptionError from '../components/product/new product/variation/error/optionError.jsx';
import _ from 'lodash';
import { useContent } from '../../../context/ContentContext.jsx';
function Input({
    asterisk,
    optional,
    label,
    inputId,
    children,
    maxlength,
    property,
    autocomplete,
}) {
    const { postageSetting, setPostageSetting, errors, setErrors } =
        usePostageContext();
    return (
        <div className="flex w-full flex-1 flex-col gap-2">
            <label className="relative w-fit font-semibold" htmlFor={inputId}>
                {label}{' '}
                {asterisk ? (
                    <span className="text-lg text-red-800">*</span>
                ) : (
                    optional && (
                        <>
                            {' '}
                            {/* <span className=" text-xs font-normal ">
                                (optional)
                            </span> */}
                        </>
                    )
                    //absolute top-1/2 right-0 translate-y-[-50%]
                )}
            </label>
            <div className="relative w-full">
                <input
                    onChange={(e) =>
                        setPostageSetting((prevState) => ({
                            ...prevState,
                            [property]: e.target.value,
                        }))
                    }
                    value={postageSetting?.[property]}
                    maxLength={maxlength}
                    type="text"
                    name={inputId}
                    id={inputId}
                    autocomplete={autocomplete}
                    className={`daisy-input daisy-input-bordered w-full border-dark-gray shadow-inner-2 ${_.has(errors, [`delivery.${property}`]) ? 'border-red-700 bg-red-100' : ''}`}
                />
                {errors?.[`delivery.${property}`] && (
                    <OptionError msg={errors?.[`delivery.${property}`]} />
                )}

                {children}
            </div>
        </div>
    );
}
function Postage({}) {
    const { logoutUser } = UserLogout();
    const [btnLoad, setBtnLoad] = useState(false);
    const [loading, setLoading] = useState(true);

    const { fetchSetting, save } = useContent();
    const [postageSetting, setPostageSetting] = useState({
        label_format: '1 label per page',
        custom_form: {
            prefill_with_title: true,
            custom_description: '',
        },
    });

    useEffect(() => {
        fetchSetting({ setPostageSetting, setLoading });
    }, []);
    const [errors, setErrors] = useState({
        'delivery.full_name': 'Please enter a full name.',
    });
    const value = { postageSetting, setPostageSetting, errors, setErrors };
    return (
        <PostageContextProvider value={value}>
            {loading ? (
                <div className="flex w-full justify-center">
                    <div className="spinner-circle spinner-lg [--spinner-color:0,0,0]" />
                </div>
            ) : (
                <section className="flex flex-col gap-8">
                    <section className="flex flex-col gap-4">
                        <h2 className="text-lg font-semibold">
                            Dispatching From
                        </h2>

                        <Input
                            label={'Full name'}
                            inputId={'full-name'}
                            asterisk
                            property={'full_name'}
                            autocomplete={'name'}
                        />

                        <section className="flex w-full flex-nowrap items-center gap-4">
                            <Input
                                label={'Street address'}
                                inputId={'street-address'}
                                asterisk
                                property={'address_1'}
                                autocomplete={'street-address'}
                            />
                            <Input
                                label={' Flat / Other'}
                                inputId={'address-2'}
                                optional
                                property={'address_2'}
                                autocomplete={'address-line2'}
                            />
                        </section>

                        <section className=" flex w-full flex-nowrap items-baseline gap-4">
                            <Input
                                label={'City'}
                                inputId={'city'}
                                asterisk
                                property={'city'}
                                autocomplete={'home city'}
                            />
                            <Input
                                label={'County'}
                                inputId={'county'}
                                optional
                                property={'county'}
                                autocomplete={'county'}
                            />

                            <Input
                                label={'Post code'}
                                inputId={'post-code'}
                                maxlength={9}
                                asterisk
                                property={'post_code'}
                                autocomplete={'postal-code'}
                            >
                                <ArrowDropDown className="absolute right-3 top-1/2 translate-y-[-50%]" />
                            </Input>
                        </section>
                        <Input
                            label={'Phone number'}
                            inputId={'phone-number'}
                            asterisk
                            property={'phone_number'}
                            autocomplete={'tel'}
                        />
                    </section>

                    <section className="flex flex-col gap-4">
                        <h1 className="text-2xl font-semibold">
                            Postage label preferences
                        </h1>

                        <p className="text-base">
                            Set your postage label preferences to streamline
                            your order fulfilment process.
                        </p>
                        <section className=" grid  w-full grid-cols-2 gap-4">
                            <Labels />

                            <CustomForm />
                            <div className="flex w-full flex-col  rounded-lg border border-dark-gray p-5">
                                <h2 className="text-lg font-semibold">
                                    Default label presets
                                </h2>

                                <p>
                                    Choose a postage label preset to prefill
                                    package details for each order. Presets are
                                    helpful if you consistently dispatch items
                                    of a similar size and weight, and use the
                                    same type of package.
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
                                        <p className="text-base">
                                            (No Default)
                                        </p>
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
                                        <p className="text-base">
                                            (No Default)
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </section>

                    <footer className="mt-6 flex w-full justify-end border-t-2 pb-12 pt-8">
                        <ThemeBtn
                            text={'Save preferences'}
                            handleClick={() =>
                                save({ setBtnLoad, postageSetting , setErrors})
                            }
                        >
                            {btnLoad ? (
                                <div className="spinner-circle spinner-sm [--spinner-color:255,255,255]" />
                            ) : (
                                <p className="text-base font-medium text-white">
                                    Save preferences
                                </p>
                            )}
                        </ThemeBtn>
                    </footer>
                </section>
            )}
        </PostageContextProvider>
    );
}

export default Postage;
