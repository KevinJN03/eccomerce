import Address from './address';
import { useState, useEffect } from 'react';
function Address_Container({
    mainAddress,
    setMainAddress,

    disable,
}) {
    return (
        <Address
            mainAddress={mainAddress}
            setMainAddress={setMainAddress}
            defaultProperty={'shipping_address'}
            addressType={'DELIVERY'}
            enableAddressEdit={true}
            disable={disable}
        />
    );
}

export default Address_Container;
