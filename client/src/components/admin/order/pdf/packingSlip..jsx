import { useEffect, useState } from 'react';
import glamo_icon from '../../../../assets/icons/glamo_logo_512px.png';
import { adminAxios } from '../../../../api/axios';
import countryLookup from 'country-code-lookup';
import dayjs from 'dayjs';
import paperPlane_icon from '../../../../assets/icons/paper-plane.png';
import Footer from './footer';
import OrderInformation from './orderInformation';
import { Text, View, Image } from '@react-pdf/renderer';
const WEBSITE_URL = import.meta.env?.VITE_WEBSITE_URL;

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
        <View style={{ height: '100%', width: '100%' }}>
            <View  style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <Image
                    src={glamo_icon}
                    style={{ height: '100pt', width: '200pt', objectFit: 'cover' , }}
                />
            </View>

            <View>
                <Text style={{fontWeight: 'semibold', fontSize: '16pt'}} className="text-xl font-semibold">glamo</Text>
                <Text className="mt-1">{WEBSITE_URL}</Text>
            </View>

            <OrderInformation order={order} feature={featureObj} />

            <Footer />
        </View>
    );
}

export default PackingSlip;
