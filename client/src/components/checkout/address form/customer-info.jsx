import { useEffect, useState } from 'react';

function Customer_Info({ className, customer }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [county, setCounty] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [mobile, setMobile] = useState('');

    useEffect(() => {
        if (customer) {
            const {
                firstName,
                lastName,
                city,
                county,
                address1,
                address2,
                postCode,
                mobile,
            } = customer;

            setFirstName(firstName);
            setLastName(lastName);
            setAddress1(address1);
            setAddress2(address2);
            setCounty(county);
            setPostCode(postCode);
            setCity(city);
            setMobile(mobile);
        }
    }, []);

    return (
        <div id="customer-info" className={className ? className : null}>
            <p>{`${firstName} ${lastName}`}</p>
            <p>{`${address1} ${address2}`}</p>
            <p>{county}</p>
            <p>{city}</p>
            <p>{postCode}</p>
            <p>UK</p>
            <p>{mobile}</p>
        </div>
    );
}

export default Customer_Info;
