import './datable.scss';

import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../modal/modal';
import axios from '../../../../../api/axios';
function Datatable({
    type,
    loading,
    setLoading,
    column,
    row,
    addBtn,
    viewBtn,
}) {
    const [modalCheck, setModalCheck] = useState(false);
    const [selection, setSelection] = useState([]);
    const [checkBox, setCheckBox] = useState(true)
    const [id, setId] = useState(null);
    const headerTitle = type[0].toUpperCase() + type.substring(1);
    const deleteButtonClick = (type, id) => {
        
        setId(id);
        setModalCheck(true);
        // setCheckBox(false)
    };
    const deleteAllClick = () => {
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
                        {viewBtn ? (
                            <button
                                type="button"
                                className="viewButton"
                                onClick={() => viewBtn(params.row._id)}
                            >
                                View
                            </button>
                        ) : (
                            <Link to={`edit/${params.row._id}`}>
                                <div className="viewButton">View</div>
                            </Link>
                        )}

                        { selection.length < 2 && 
                        <button
                            className="deleteButton"
                            onClick={() =>
                                deleteButtonClick(type, params.row._id)
                            }
                        >
                            
                            
                            Delete
                        </button>
                        }
                    </div>
                );
            },
        },
    ];

    return (
        <section className="datatable">
            <div className="datatableTitle">
                Add New {headerTitle}
                <div>
                    {selection.length > 0 && (
                        <button
                            type="button"
                            className="link mr-2 !border-red-500 !text-red-500"
                            onClick={deleteAllClick}
                        >
                            Delete All ({selection.length})
                        </button>
                    )}
                    {addBtn ? (
                        <button type="button" className="link" onClick={addBtn}>
                            Add New
                        </button>
                    ) : (
                        <Link className="link" to="new">
                            Add New
                        </Link>
                    )}
                </div>
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
                isRowSelectable={(params) => params.row.name != 'Express Delivery'}
                onRowSelectionModelChange={(select) => {
                    setSelection(select);
                }}
            />
            {modalCheck && (
                <Modal
                    setCheck={setModalCheck}
                    check={modalCheck}
                    loading={loading}
                    deleteType={type}
                    id={id}
                    setLoading={setLoading}
                    selection={selection}
                />
            )}
        </section>
    );
}

export default Datatable;
