import React, { useState } from 'react';

import Footer from './footer.jsx';
import OrderInformation from './orderInformation.jsx';
import { Text, View, Image } from '@react-pdf/renderer';
import 'dotenv/config';

const { WEBSITE_URL, CLOUDFRONT_URL } = process.env;

function PackingSlip({ order, checks }) {
  const featureObj = {
    orderNumber: true,
    shop: false,
    buyer: true,
  };

 
  return (
    <View style={{ height: '100%', width: '100%' }}>
      {checks?.shop_info == 'order_receipt_banner' && (
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <Image
            src={`${CLOUDFRONT_URL}/files/logos/glamo-black-logo.png`}
            style={{ height: '100pt', width: '200pt', objectFit: 'cover' }}
          />
        </View>
      )}

      <View style={{display: 'flex', flexDirection: 'row' , alignItems: 'center', gap: '10pt'}}> 
        {checks?.shop_info == 'shop_icon' && (
          <Image
            src={`${CLOUDFRONT_URL}/files/logos/glamo-black-logo.png`}
            style={{ height: '40pt', width: '40pt', objectFit: 'cover' }}
          />
        )}
        <View>
          <Text style={{ fontWeight: 'semibold', fontSize: '16pt' }}>
            glamo
          </Text>
          <Text>{WEBSITE_URL}</Text>
        </View>
      </View>

      <OrderInformation order={order} feature={featureObj} checks={checks}  />

      <Footer checks={checks} />
    </View>
  );
}

export default PackingSlip;
