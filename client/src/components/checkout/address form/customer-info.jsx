import { useEffect, useState } from 'react';

function Customer_Info({ className, customer, elementClass }) {
    return (
        <div id="customer-info" className={className ? className : null}>
            <p
                className={elementClass}
            >{`${customer?.firstName} ${customer?.lastName}`}</p>
            <p className={elementClass}>{`${customer?.address_1} `}</p>
            {customer.address_2 && (
                <p className={elementClass}>{`${customer?.address_2} `}</p>
            )}
            <p className={elementClass}>{customer?.county}</p>
            <p className={elementClass}>{customer?.city}</p>
            <p className={elementClass}>{customer?.postCode}</p>
            <p className={elementClass}>UK</p>
            <p className={elementClass}>{customer?.mobile}</p>
        </div>
    );
}

export default Customer_Info;
