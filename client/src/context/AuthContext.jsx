import { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': {
            return { user: action.payload, isLogin: true };
        }

        case 'LOGOUT':
            return { user: null, isLogin: false };

        default:
            return state;
    }
};
export function AuthContextProvider({ children }) {
    const [authUser, dispatch] = useReducer(authReducer, {});

    return (
        <AuthContext.Provider value={{ authUser, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
