import { useReducer, createContext, useContext } from 'react';
import darkModeReducer from './darkModeReducer';

const INITIAL_STATE = {
    darkMode: false,
};

export const DarkModeContext = createContext(INITIAL_STATE);
export function useDarkMode() {
    return useContext(DarkModeContext);
}
export function DarkModeContextProvider({ children }) {
    const [state, dispatch] = useReducer(darkModeReducer, INITIAL_STATE);
    return (
        <DarkModeContext.Provider
            value={{ darkMode: state.darkMode, dispatch }}
        >
            {children}
        </DarkModeContext.Provider>
    );
}
