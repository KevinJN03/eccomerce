import { useEffect, useState } from 'react';
import glamo_icon from '../../../../assets/icons/glamo-black-logo.svg';
import { adminAxios } from '../../../../api/axios';
import countryLookup from 'country-code-lookup';
import dayjs from 'dayjs';
import paperPlane_icon from '../../../../assets/icons/paper-plane.png';
import Footer from './footer';
import OrderInformation from './orderInformation';
const WEBSITE_URL = import.meta.env?.VITE_WEBSITE_URL;

function GenerateAddress({ name, address }) {
    return (
        <p>
            {name} <br />
            {address?.line1} <br />
            {address?.line2 && (
                <>
                    {address?.line2}
                    <br />
                </>
            )}
            {`${address?.city}, ${address?.postal_code}`} <br />
            {countryLookup.byIso(address?.country)?.country}
        </p>
    );
}
function PackingSlip({ order }) {
    const [fromAddress, setFromAddress] = useState({
        name: 'Kevin Jean',
        address: {
            line1: 'Flat 8',
            line2: '848 Queens Road',
            city: 'KINGSTON UPON THAMES',
            country: 'GB',
            postal_code: 'KT65 9XD',
        },
    });

    const featureObj = {
        fromAddress: true,
        orderNumber: true,
        shop: false,
        buyer: true,
    };
    return (
        <section className="min-h-screen w-[800px] p-4">
            {order?._id && (
                <>
                    <header className="flex h-32 w-full items-center justify-center">
                        <img
                            src={glamo_icon}
                            alt="glamo icon"
                            className="object-fit h-20"
                        />
                    </header>

                    <section>
                        <p className="text-xl font-semibold">glamo</p>
                        <p className="mt-1">{WEBSITE_URL}</p>
                    </section>

                    <OrderInformation order={order} feature={featureObj} />
                </>
            )}

            <Footer />
        </section>
    );
}

export default PackingSlip;
