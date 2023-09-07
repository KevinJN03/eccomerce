import { Outlet } from 'react-router-dom';
import './list.scss';
import { DarkModeContext } from '../../../../context/darkModeContext';
import { useContext } from 'react';
function Users({}) {
    const { darkMode } = useContext(DarkModeContext);
    console.log('DarkMode', darkMode);
    return <Outlet />;
}

export default Users;
