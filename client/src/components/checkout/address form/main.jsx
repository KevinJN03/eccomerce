import { motion } from 'framer-motion';
import { generateVariants } from './address-item';
import { useCheckoutContext } from '../../../context/checkOutContext';
import Customer_Info from './customer-info';
import { useAddressContext } from '../../../context/checkOutAddressContext';
import { SubHeader } from '../payment/SubHeader';

const mainComponentVariant = generateVariants(1);
function Main() {
    const {
        mainAddress,
        viewDispatch,
        addressType,
        handleChange,
        disableChangeBtn,
        subHeader,
    } = useAddressContext();
    const { disableOtherComponents, SetDisableOtherComponents } =
        useCheckoutContext();

    return (
        <motion.div
            className="adress-info-container flex flex-row flex-wrap items-baseline justify-between"
            variants={mainComponentVariant}
            animate={'animate'}
            initial={'initial'}
            exit={'exit'}
        >
            {disableChangeBtn && (
                <div className="mb-6 w-full basis-full">
                    <SubHeader
                        {...subHeader}
                        onClick={handleChange}
                        disable={
                            disableOtherComponents.disable &&
                            disableOtherComponents.addressType != addressType
                        }
                    />{' '}
                </div>
            )}

            <Customer_Info customer={mainAddress} />
            {!disableChangeBtn && (
                <button
                    disabled={
                        disableOtherComponents.disable &&
                        disableOtherComponents.addressType != addressType
                    }
                    type="button"
                    id="checkout-change-btn"
                    onClick={handleChange}
                >
                    CHANGE
                </button>
            )}
        </motion.div>
    );
}

export default Main;
