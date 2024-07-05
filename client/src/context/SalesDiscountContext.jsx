import { createContext, useContext, useState } from 'react';

const SalesDiscountContext = createContext();

export const useSalesDiscountContext = () => {
    return useContext(SalesDiscountContext);
};
function SalesDiscountProvider({children}) {
    const [showAction, setShowAction] = useState(!false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedId, setSelectedId] = useState('');
    const [modalOpen, setModalOpen] = useState(false);


    const value = {
        showAction, setShowAction,
        anchorEl, setAnchorEl, 
        selectedId, setSelectedId,
        modalOpen, setModalOpen

    }
    return (
        <SalesDiscountContext.Provider value={value}>
            {children}
        </SalesDiscountContext.Provider>
    );
}

export default SalesDiscountProvider;
