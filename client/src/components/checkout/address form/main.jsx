import { motion } from 'framer-motion';
import { generateVariants } from './address-item';
import { useCheckoutContext } from '../../../context/checkOutContext';
import Customer_Info from './customer-info';
import { useAddressContext } from '../../../context/checkOutAddressContext';

const mainComponentVariant = generateVariants(1);
function Main() {
    const { mainAddress, viewDispatch, addressType , handleChange} = useAddressContext();
    const { disableOtherComponents, SetDisableOtherComponents } =
        useCheckoutContext();

 
    return (
        
        <motion.div
            className="adress-info-container flex flex-row items-baseline justify-between"
            variants={mainComponentVariant}
            animate={'animate'}
            initial={'initial'}
            exit={'exit'}
        >
            <Customer_Info customer={mainAddress} />
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
        </motion.div>
    );
}

export default Main;
