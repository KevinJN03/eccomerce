import { useEffect, useState } from 'react';

function Customer_Info({ className, customer, elementClass }) {
    const [firstName, setFirstName] = useState(customer?.firstName || '');
    const [lastName, setLastName] = useState(customer?.lastName || '');
    const [address1, setAddress1] = useState(customer?.address_1 || '');
    const [address2, setAddress2] = useState(customer?.address_2 || '');
    const [county, setCounty] = useState(customer?.county || '');
    const [postCode, setPostCode] = useState(customer?.postCode || '');
    const [city, setCity] = useState(customer?.city|| '');
    const [mobile, setMobile] = useState(customer?.mobile|| '');

    return (
        <div id="customer-info" className={className ? className : null}>
            <p  className={elementClass}>{`${firstName} ${lastName}`}</p>
            <p  className={elementClass}>{`${address1} ${address2}`}</p>
            <p  className={elementClass}>{county}</p>
            <p  className={elementClass}>{city}</p>
            < p className={elementClass}>{postCode}</p>
            <p  className={elementClass}>UK</p>
            <p  className={elementClass}>{mobile}</p>
        </div>
    ); 
}

export default Customer_Info;
