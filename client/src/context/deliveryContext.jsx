import { createContext, useContext, useRef, useState } from 'react';

const DeliveryContext = createContext();

export const useDeliveryContext = () => {
    return useContext(DeliveryContext);
};
function DeliveryContextProvider({ children }) {
    const [profiles, setProfiles] = useState([]);
    const [postageSetting, setPostageSetting] = useState({
        label_format: '1 label per page',
        custom_form: {
            prefill_with_title: !true,
            custom_description: '',
        },
    });

    const value = {
        profiles,
        setProfiles,
        postageSetting,
        setPostageSetting,
    };
    return (
        <DeliveryContext.Provider value={value}>
            {children}
        </DeliveryContext.Provider>
    );
}

export default DeliveryContextProvider;
