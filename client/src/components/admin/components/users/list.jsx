import SideBar from '../sidebar/sidebar.jsx';
import Navbar from '../navbar/navbar.jsx';
import './list.scss';
import '../sidebar/sidebar.scss';
import Datatable from './datatable/datatable.jsx';
import DragDropFile from '../product/new product/dragDropFile.jsx';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios, { adminAxios } from '../../../../api/axios.js';
import { userColumn } from './datatable/datatable-source.jsx';
import actionColumn from './datatable/actionColumn.jsx';
function All_Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selection, setSelection] = useState([]);
    selection;
    useEffect(() => {
        adminAxios
            .get('/user/all')
            .then((res) => {
                if (res.status == 200) {
                    setUsers(res.data);
                }
            })
            .catch((error) => {
                'error at fetchng users in admin', error;
            });
    }, [loading]);

    const deleteButtonClick = (type, id) => {
        setId(id);
        setModalCheck(true);
        // setCheckBox(false)
    };

    const columnAction = actionColumn({
        viewBtn: false,
        selection,
        deleteButtonClick,
    });
    return (
        <Datatable
            type="user"
            setLoading={setLoading}
            loading={loading}
            column={userColumn}
            row={users}
            selection={selection}
            setSelection={setSelection}
            deleteButtonClick={deleteButtonClick}
            actionColumn={columnAction}
        />
    );
}

export default All_Users;
