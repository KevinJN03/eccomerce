import { useRef } from 'react';
import Customer_Info from './customer-info';
import { AnimatePresence, motion } from 'framer-motion';

function Address_Item({
    address,
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
    currentAddressId,
}) {
    const inputRef = useRef(null);

    const variants = {
        initial: {
            opacity: 0.6,
        },
        animate: {
            opacity: 1,

            transition: {
                duration: 0.5,
            },
        },

        exit: {
            opacity: 0,
        },
    };

    const handleCurrentAddress = () => {
        inputRef.current.click();
        setLoading(() => true);

        setTimeout(() => {
            setMainAddress(() => address);
            viewDispatch({ type: 'main' });
            setLoading(() => false);
        }, 1000);
    };

    const addressTypeLowerCase = addressType.toLowerCase();
    return (
        <AnimatePresence>
            <motion.section className="border-b-[1px]">
                <div
                    key={address._id}
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
                >
                    {address._id == defaultAddresses[defaultProperty] ? (
                        <p className="mt-6">
                            This is your default {addressTypeLowerCase} address
                        </p>
                    ) : (
                        <div className="mt-6 flex items-center gap-x-3">
                            <input
                                disabled={loading}
                                onChange={() => handleDefault(address._id)}
                                type="checkbox"
                                id="checkbox"
                                className="daisy-checkbox rounded-none"
                            />
                            <p>
                                Set as your default {addressTypeLowerCase}{' '}
                                address
                            </p>
                        </div>
                    )}
                </motion.div>

                <button
                    disabled={loading}
                    onClick={() => handleEdit(address)}
                    className={
                        'my-5 text-sm font-bold tracking-widest hover:underline disabled:cursor-not-allowed'
                    }
                >
                    EDIT ADDRESS
                </button>
            </motion.section>
        </AnimatePresence>
    );
}

export default Address_Item;
