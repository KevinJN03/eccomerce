import { createContext, useContext } from 'react';
import { useCheckoutContext } from './checkOutContext';
import findAddress from '../components/common/findaddress';
const AddressContext = createContext(null);

export const useAddressContext = () => {
    return useContext(AddressContext);
};
export function AddressContextProvider({ children, value }) {
    const {
        viewDispatch,
        viewContent,
        addressType,
        temporaryMainAddress,
        setMainAddress,
        setTemporaryMainAddress,
        addresses,
        mainAddress,
        defaultAddresses,
        defaultProperty,
        disableRef,
    } = value;
    const {
        disableOtherComponents,
        SetDisableOtherComponents,
        setIsDeliveryAddressFill,
    } = useCheckoutContext();
    const handleChange = () => {
    
        // if (
        //     disableOtherComponents.disable &&
        //     disableOtherComponents.addressType != addressType
        // ) {
        //     return;
        // }

        SetDisableOtherComponents({
            addressType,
            disable: true,
        });
        viewDispatch({ type: 'book' });
    };

    const cancel = () => {
        'cancel', viewContent;
        disableRef.current = true;

        // setTemporaryMainAddress(() => mainAddress);
        viewDispatch({ type: 'main' });
        SetDisableOtherComponents({
            addressType: null,
            disable: false,
        });

        setTimeout(() => {
            disableRef.current = false;
        }, 500);
    };

    const handleClick = (updateMainAddress = true) => {
        if (updateMainAddress) {
            // setMainAddress(() => temporaryMainAddress);

            const foundAddress = findAddress({
                property: defaultProperty,
                default_address: defaultAddresses,
                addresses,
            });
            console.log({ foundAddress, defaultAddresses, defaultProperty });
            setMainAddress(() => foundAddress);
        }
        SetDisableOtherComponents({
            addressType: null,
            disable: false,
        });
    };

    const handleEdit = (address) => {
        setTemporaryMainAddress(() => address);

        viewDispatch({ type: 'edit' });
    };

    const handleNewAddress = () => {
        ({ disableRef });
        if (disableRef.current) {
            return;
        }
        setTemporaryMainAddress({});
        viewDispatch({ type: 'add' });
    };

    return (
        <AddressContext.Provider
            value={{
                ...value,
                cancel,
                handleChange,
                handleClick,
                handleEdit,
                handleNewAddress,
            }}
        >
            {children}
        </AddressContext.Provider>
    );
}
