import {createContext, useContext, useEffect, useState} from "react"
const PromoContext = createContext(null);
export const usePromo = () => {
    return useContext(PromoContext);
};

export const PromoProvider = ({children}) => {
const [promo, setPromo] = useState([{ bool: false }]);
    return (
        <PromoContext.Provider value={{promo, setPromo}}>
{children}
        </PromoContext.Provider>

    )
}