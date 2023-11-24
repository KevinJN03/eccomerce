import { useRef, version } from 'react';
import Address_Form from './address-form';
import Address_Item from './address-item';
import { AnimatePresence, motion } from 'framer-motion';
import variants from './variants.js';
import { useAddressContext } from '../../../context/checkOutAddressContext';
function Address_Book({}) {
    const {
        loading,
        handleNewAddress,
        sortAddresses,
        viewContent,
        cancel,
        disableRef,
    } = useAddressContext();

    return (
        <motion.section
            variants={variants}
            animate={'animate'}
            initial={'initial'}
            exit={'exit'}
            className="flex flex-col gap-y-6"
        >
            <h2 className="mb-[-10px] p-0 font-bold">ADDRESS BOOK</h2>
            {sortAddresses.map((address, idx) => {
                return (
                    <Address_Item
                        key={address._id}
                        address={address}
                        idx={idx}
                    />
                );
            })}

            <div className="flex flex-row justify-between">
                <button
                    disabled={loading || disableRef.current}
                    onClick={() => handleNewAddress()}
                    className="!bg-primary px-4 py-2 font-bold tracking-wider text-white transition-all hover:!bg-black disabled:cursor-not-allowed"
                >
                    ADD NEW ADDRESS
                </button>
                <button
                    disabled={loading || disableRef.current}
                    id="checkout-change-btn"
                    onClick={() => cancel()}
                >
                    CANCEL
                </button>
            </div>
        </motion.section>
    );
}

export default Address_Book;
