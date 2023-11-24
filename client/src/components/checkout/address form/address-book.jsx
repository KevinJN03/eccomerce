import { useRef } from 'react';
import Address_Form from './address-form';
import Address_Item from './address-item';
import { AnimatePresence, motion, stagger } from 'framer-motion';
import variants from './variants';
function Address_Book({
    loading,
    handleNewAddress,
    sortAddresses,
    viewDispatch,
    addressItemProps,
    viewContent,
    cancel,
}) {
    return (
        <motion.section
            key={viewContent}
            variants={variants}
            animate={'animate'}
            initial={'initial'}
            exit={'exit'}
            className="flex flex-col gap-y-6"
        >
            <h2 className="mb-[-10px] p-0 font-bold">ADDRESS BOOK</h2>
            {sortAddresses.map((address, idx) => {
                const props = {
                    address,
                    ...addressItemProps,
                };

                return <Address_Item {...props} key={address._id} idx={idx} />;
            })}

            <div className="flex flex-row justify-between">
                <button
                    disabled={loading}
                    onClick={handleNewAddress}
                    className="!bg-primary px-4 py-2 font-bold tracking-wider text-white transition-all hover:!bg-black disabled:cursor-not-allowed"
                >
                    ADD NEW ADDRESS
                </button>
                <button
                    disabled={loading}
                    id="checkout-change-btn"
                    onClick={cancel}
                >
                    CANCEL
                </button>
            </div>
        </motion.section>
    );
}

export default Address_Book;
