import React from 'react';
export const userRows = [
    {
        id: 1,
        lastName: 'Snow',
        firstName: 'Jon',
        age: 35,
        email: 'email@gmail.com',
        status: 'active',
        username: 'randomUser',
        img: 'https://images.pexels.com/photos/3777952/pexels-photo-3777952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 2,
        lastName: 'Lannister',
        firstName: 'Cersei',
        age: 42,
        email: 'email@gmail.com',
        status: 'restricted',
        username: 'randomUser',
        img: 'https://images.pexels.com/photos/3777952/pexels-photo-3777952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 3,
        lastName: 'Lannister',
        firstName: 'Jaime',
        age: 45,
        email: 'email@gmail.com',
        status: 'restricted',
        username: 'randomUser',
        img: 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    },
    {
        id: 4,
        lastName: 'Stark',
        firstName: 'Arya',
        age: 16,
        email: 'email@gmail.com',
        status: 'restricted',
        username: 'brandomUser',
        img: 'https://images.unsplash.com/photo-1627161683077-e34782c24d81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1903&q=80',
    },
    {
        id: 5,
        lastName: 'Targaryen',
        firstName: 'Daenerys',
        age: null,
        email: 'email@gmail.com',
        status: 'active',
        username: 'arandomUser',
        img: 'https://images.pexels.com/photos/3777952/pexels-photo-3777952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 6,
        lastName: 'Melisandre',
        firstName: null,
        age: 150,
        email: 'email@gmail.com',
        status: 'active',
        username: 'adam_user',
        img: 'https://images.pexels.com/photos/3777952/pexels-photo-3777952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 7,
        lastName: 'Clifford',
        firstName: 'Ferrara',
        age: 44,
        email: 'email@gmail.com',
        status: 'restricted',
        username: 'adam_user',
        img: 'https://images.pexels.com/photos/3777952/pexels-photo-3777952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 8,
        lastName: 'Frances',
        firstName: 'Rossini',
        age: 36,
        email: 'email@gmail.com',
        status: 'active',
        username: 'adam_user',
        img: 'https://images.pexels.com/photos/3777952/pexels-photo-3777952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
        id: 9,
        lastName: 'Roxie',
        firstName: 'Harvey',
        age: 65,
        email: 'email@gmail.com',
        status: 'active',
        username: 'randomUser',
        img: 'https://images.pexels.com/photos/3777952/pexels-photo-3777952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
];

export const userColumn = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'user',
        headerName: 'User',
        width: 230,
        sortable: false,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img
                        className="cellImg"
                        src={params.row.img}
                        alt="avatar"
                    />
                    {/* {params.row.firstName || " "} {params.row.lastName || ""} */}
                    {params.row.username}
                </div>
            );
        },
    },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'status',
        headerName: 'Status',

        sortable: false,
        width: 160,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.status}`}>
                    {params.row.status}
                </div>
            );
        },
    },
];

export const productRow = [
    {
        id: 1,
        product: 'Shirt',
        img: 'https://images.asos-media.com/products/bolongaro-trevor-slim-fit-grandad-shirt/203568885-1-white?$n_240w$&wid=40&fit=constrain',
        category: 'men',
        size: 'XS, S, L',
        price: '30.99',
        quantity: 10,
    },
    {
        id: 2,
        product: 'Shirt',
        img: 'https://images.asos-media.com/products/bolongaro-trevor-slim-fit-grandad-shirt/203568885-1-white?$n_240w$&wid=40&fit=constrain',
        category: 'men',
        size: 'XS, S, L',
        price: '30.99',
        quantity: 10,
    },
    {
        id: 3,
        product: 'Shirt',
        img: 'https://images.asos-media.com/products/bolongaro-trevor-slim-fit-grandad-shirt/203568885-1-white?$n_240w$&wid=40&fit=constrain',
        category: 'men',
        size: 'XS, S, L',
        price: '30.99',
        quantity: 10,
    },
];

export const productColumn = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'product',
        headerName: 'Product',
        width: 230,
        sortable: false,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img
                        className="cellImg"
                        src={params.row.img}
                        alt="avatar"
                    />
                    {params.row.product}
                </div>
            );
        },
    },
    { field: 'category', headerName: 'Category', width: 200 },
    { field: 'size', headerName: 'Size', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
        field: 'quantity',
        headerName: 'Quantity',
        type: 'number',
        width: 90,
    },
];
