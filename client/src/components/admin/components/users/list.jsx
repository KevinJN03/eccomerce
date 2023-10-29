import SideBar from '../sidebar/sidebar.jsx';
import Navbar from '../navbar/navbar.jsx';
import './list.scss';
import '../sidebar/sidebar.scss';
import Datatable from './datatable/datatable.jsx';
import DragDropFile from '../product/new product/dragDropFile.jsx';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../../../api/axios.js';
import { userColumn } from './datatable/datatable-source.jsx';
function All_Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selection, setSelection] = useState([]);
    console.log(selection);
    useEffect(() => {
        axios
            .get('/user/all')
            .then((res) => {
                if (res.status == 200) {
                    setUsers(res.data);
                }
            })
            .catch((error) => {
                console.log('error at fetchng users in admin', error);
            });
    }, [loading]);
    return (
        <Datatable
            type="user"
            setLoading={setLoading}
            loading={loading}
            column={userColumn}
            row={users}
        />
    );
}

export default All_Users;
