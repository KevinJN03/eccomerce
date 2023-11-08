import { createContext, useContext } from 'react';

const UserDashboardContext = createContext(null);
export const useUserDashboardContext = () => {
    return useContext(UserDashboardContext);
};
export function UserDashboardProvider({ value, children }) {
    return (
        <UserDashboardContext.Provider value={value}>
            {children}
        </UserDashboardContext.Provider>
    );
}

export default UserDashboardProvider;
