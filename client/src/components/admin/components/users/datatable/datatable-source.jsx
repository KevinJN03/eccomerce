import React from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import userIcon from '../../../../../assets/icons/user.png';

export const userColumn = [
    { field: '_id', headerName: 'ID', width: 100 },
    {
        field: 'user',
        headerName: 'User',
        // width: 100,
        sortable: false,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img
                        className="cellImg object-top"
                        src={params.row.profileImg || userIcon}
                        alt="avatar"
                    />
                    {params.row.username}
                </div>
            );
        },
    },
    { field: 'email', headerName: 'Email' /* width: 100 */ },
    { field: 'firstName', headerName: 'First name' /* width: 100 */ },

    { field: 'lastName', headerName: 'Last name' /* width: 100 */ },
    { field: 'interest', headerName: 'Interest' /* width: 100 */ },
    {
        field: 'dob',
        headerName: 'Age',
        // type: 'number',
        /*   width: 100, */
        renderCell: (params) => {
            const year = new Date(params.row.dob).getFullYear();
            const currentYear = new Date().getFullYear();
            return currentYear - year;
        },
    },
    {
        field: 'status',
        headerName: 'Status',

        sortable: false,
        width: 160,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.status}`}>
                    {params.row.status || 'active'}
                </div>
            );
        },
    },
];

export const productColumn = [
    { field: '_id', headerName: 'ID', width: 120 },
    {
        field: 'title',
        headerName: 'Product',
        width: 200,
        margin: 10,
        sortable: false,
        headerAlign: 'center',
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img
                        className="cellImg"
                        src={params.row.images[0]}
                        alt="avatar"
                    />
                    {params.row.title}
                </div>
            );
        },
    },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'category', headerName: 'Category', width: 140, renderCell: (params) => {
        return (
            params.row.category.name.toUpperCase()
        )
    } },
    {
        field: 'size',
        headerName: 'Size',
        width: 130,
        renderCell: (params) => {
            return (
                <>
                    {params.row.size.map((elem, idx) => {
                        if (idx != params.row.size.length - 1) {
                            return elem.size + ', ';
                        }
                        return elem.size;
                    })}
                </>
            );
        },
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 50,
        margin: '10',
        headerAlign: 'center',
        renderCell: (params) => {
            return <p>£ {params.row?.price?.current}</p>;
        },
    },
    {
        field: 'stock',
        headerName: 'Stock',
        type: 'number',
        width: 90,
        renderCell: (params) => {
            let total = 0;
            params.row.size.map((elem) => {
                total += elem.stock;
            });
            return <>{total}</>;
        },
    },
];

export const deliveryColumn = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },

    { field: 'processingTime', headerName: 'Processing Time', width: 150, renderCell: (params) => {
        const {start, end} = params.row.processingTime
        return `${start} - ${end}`
    } },
    { field: 'cost', headerName: 'Cost', width: 100, renderCell: (params) => {
        return `£ ${params.row.cost}` 
    }},
];
