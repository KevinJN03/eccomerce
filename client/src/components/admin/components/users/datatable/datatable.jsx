import './datable.scss';

import { DataGrid } from '@mui/x-data-grid';

import { userColumn, productColumn } from './datatable-source';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import BasicModal from '../../modal/modal';
import axios from '../../../../../api/axios';
function Datatable({ type, products, users , loading, setLoading}) {
    
    const [modalCheck, setModalCheck] = useState(false);
    const [deleteType, setDeleteType] = useState(null);
    const [id, setId] = useState(null);
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
        setDeleteType(type);
        setId(id)
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
                                deleteButtonClick('user', params.row._id)
                            }
                        >
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    const product_actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 160,
            headerAlign: 'left',
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={params.row._id}>
                            <div className="viewButton">View</div>
                        </Link>
                        <button
                            className="deleteButton"
                            onClick={() =>
                                deleteButtonClick('product', params.row._id)
                            }
                        >
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];
    return (
        <section className="datatable">
            <div className="datatableTitle">
                Add New {type}
                <Link className="link" to="new">
                    Add New
                </Link>
            </div>
            <DataGrid
                getRowId={(row) => row._id}
                className="datagrid"
                rows={
                    (type == 'User' && users) || (type == 'Product' && products)
                }
                columns={
                    (type == 'User' && userColumn.concat(actionColumn)) ||
                    (type == 'Product' &&
                        productColumn.concat(product_actionColumn))
                }
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10, 20]}
                checkboxSelection
            />
            {modalCheck && (
                <BasicModal
                    setCheck={setModalCheck}
                    check={modalCheck}
                    loading={loading}
                    deleteType={deleteType}
                    id={id}
                  
                    setLoading={setLoading}
                />
            )}
        </section>
    );
}

export default Datatable;
