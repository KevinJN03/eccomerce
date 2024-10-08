import { useRef } from 'react';
import Customer_Info from './customer-info';
import { AnimatePresence, motion, stagger } from 'framer-motion';
import { useCheckoutContext } from '../../../context/checkOutContext';
import { v4 as uuidv4 } from 'uuid';
import { useAddressContext } from '../../../context/checkOutAddressContext';

export const generateVariants = (idx, exitDuration = 0.2) => {
    return {
        initial: {
            opacity: 0,
            translateX: -50,
        },
        animate: {
            opacity: 1,
            translateX: 0,
            transition: {
                duration: 0.5,
                ease: 'easeInOut',
                delay: idx * 0.3,
            },
        },

        exit: {
            opacity: 0,
            translateX: 50,
            transition: {
                duration: exitDuration,
                ease: 'easeOut',
            },
        },
    };
};
function Address_Item({ address, idx }) {
    const {
        setCheckAddress,
        defaultAddresses,
        defaultProperty,
        handleDefault,
        handleEdit,
        loading,
        setLoading,
        viewDispatch,
        setMainAddress,
        addressType,
        mainAddress,
        enableAddressEdit,
        disableRef,
    } = useAddressContext();

    const currentAddressId = mainAddress?._id;
    const { disableOtherComponents, SetDisableOtherComponents } =
        useCheckoutContext();
    const inputRef = useRef(null);

    const variants = generateVariants(idx + 1);

    const handleCurrentAddress = () => {
        inputRef.current.click();
        setLoading(() => true);

        setTimeout(() => {
            setMainAddress(() => address);
            viewDispatch({ type: 'main' });
            setLoading(() => false);

            SetDisableOtherComponents({
                addressType: null,
                disable: false,
            });
        }, 1000);
    };

    const addressTypeLowerCase = addressType.toLowerCase();

    return (
        <motion.section
            className="border-b-[1px]"
            variants={variants}
            animate={'animate'}
            initial={'initial'}
            exit={'exit'}
        >
            <div
                key={uuidv4()}
                className="flex flex-row items-center hover:cursor-pointer"
                onClick={() => handleCurrentAddress()}
            >
                <Customer_Info customer={address} />
                <input
                    disabled={loading}
                    onChange={() => setCheckAddress(() => address._id)}
                    type="radio"
                    name="address"
                    className="daisy-radio ml-auto mr-14"
                    ref={inputRef}
                    checked={currentAddressId == address._id}
                />
            </div>
            <motion.div
                key={defaultAddresses[defaultProperty]}
                variants={variants}
                initial={'initial'}
                animate={'animate'}
                exit={'exit'}
                className="mb-5"
            >
                {address._id == defaultAddresses[defaultProperty] ? (
                    <p className="mt-6">
                        This is your default {addressTypeLowerCase} address
                    </p>
                ) : (
                    <div className="mt-6 flex items-center gap-x-3">
                        <input
                            disabled={loading || disableRef.current}
                            onChange={() => handleDefault(address._id)}
                            type="checkbox"
                            id="checkbox"
                            className="daisy-checkbox !rounded-none"
                        />
                        <p>
                            Set as your default {addressTypeLowerCase} address
                        </p>
                    </div>
                )}
            </motion.div>

            {enableAddressEdit && (
                <button
                    disabled={loading || disableRef.current}
                    onClick={() => handleEdit(address)}
                    className={
                        'mb-5 text-sm font-bold tracking-widest hover:underline disabled:cursor-not-allowed'
                    }
                >
                    EDIT ADDRESS
                </button>
            )}
        </motion.section>
    );
}

export default Address_Item;
