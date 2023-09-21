import './datable.scss';

import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../../modal/modal';
import axios from '../../../../../api/axios';
function Datatable({ type, loading, setLoading, column, row }) {
    const [modalCheck, setModalCheck] = useState(false);
    const [deleteType, setDeleteType] = useState(null);
    const [id, setId] = useState(null);
    const headerTitle = type[0].toUpperCase() + type.substring(1)
    const modalHandleClick = (type, id) => {
        if (type === 'user') {
            axios.delete(`/delete/user/${id}`).then((res) => {
                if (res.status === 200) {
                    setLoading(true);
                }
            });
        }
    };

    const deleteButtonClick = (type, id) => {
        // setDeleteType(type);
        setId(id);
        setModalCheck(true);
    };

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={params.row._id}>
                            <div className="viewButton">View</div>
                        </Link>

                        <button
                            className="deleteButton"
                            onClick={() =>
                                deleteButtonClick(type, params.row._id)
                            }
                        >
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    // const product_actionColumn = [
    //     {
    //         field: 'action',
    //         headerName: 'Action',
    //         width: 160,
    //         headerAlign: 'left',
    //         renderCell: (params) => {
    //             return (
    //                 <div className="cellAction">
    //                     <Link to={params.row._id}>
    //                         <div className="viewButton">View</div>
    //                     </Link>
    //                     <button
    //                         className="deleteButton"
    //                         onClick={() =>
    //                             deleteButtonClick('product', params.row._id)
    //                         }
    //                     >
    //                         Delete
    //                     </button>
    //                 </div>
    //             );
    //         },
    //     },
    // ];
    return (
        <section className="datatable">
            <div className="datatableTitle">
                Add New {headerTitle}
                <Link className="link" to="new">
                    Add New
                </Link>
            </div>
            <DataGrid
                getRowId={(row) => row._id}
                className="datagrid"
                rows={row}
                columns={column.concat(actionColumn)}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10, 20]}
                checkboxSelection
            />
            {modalCheck && (
                <Modal
                    setCheck={setModalCheck}
                    check={modalCheck}
                    loading={loading}
                    deleteType={type}
                    id={id}
                    setLoading={setLoading}
                />
            )}
        </section>
    );
}

export default Datatable;
