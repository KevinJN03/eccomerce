import './datable.scss';

import { DataGrid } from '@mui/x-data-grid';

import {
    userColumn,
    userRows,
    productColumn,
    productRow,
} from './datatable-source';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import BasicModal from '../../modal/modal';
function Datatable({ type, products }) {
    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: () => {
                return (
                    <div className="cellAction">
                        <Link to="test">
                            <div className="viewButton">View</div>
                        </Link>
                        <BasicModal
                            modal_title={
                                ' Are you sure you want to delete this'
                            }
                            modalContent="delete"
                            button_text={'Delete'}
                        />
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
            renderCell: () => {
                return (
                    <div className="cellAction">
                        <Link to="test">
                            <div className="viewButton">View</div>
                        </Link>

                        <BasicModal
                            modal_title={
                                ' Are you sure you want to delete this'
                            }
                            modalContent="delete"
                            button_text={'Delete'}
                        />
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
                    (type == 'User' && userRows) ||
                    (type == 'Product' && products)
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
        </section>
    );
}

export default Datatable;
