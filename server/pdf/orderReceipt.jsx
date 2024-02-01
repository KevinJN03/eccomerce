import React, { useState } from 'react';
import Footer from './footer.jsx';
import OrderInformation from './orderInformation.jsx';
import { Text, View, Image } from '@react-pdf/renderer';
const { CLOUDFRONT_URL } = process.env;
function OrderReceipt({ order, checks }) {
  const featureObj = {
    fromAddress: false,
    orderNumber: false,
    shop: true,
    buyer: false,
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}
    >
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
      <View>
        <Text
          style={{
            fontSize: '14pt',
            fontWeight: 'semibold',
          }}
        >
          Order #{order?._id}
        </Text>
        <Text>
          {`${order?.customer?.firstName} ${order?.customer?.lastName} `}
          <Text style={{ fontSize: '8pt' }}>{`(${order?.customer?._id})`}</Text>
        </Text>
      </View>
      <OrderInformation order={order} feature={featureObj} checks={checks} />
      <Footer />
    </View>
  );
}

export default OrderReceipt;
