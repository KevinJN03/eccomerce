import React, { useEffect, useState } from 'react';
import 'dotenv/config';
import OrderReceipt from './orderReceipt.jsx';
import PackingSlip from './packingSlip.jsx';

import {
  Page,
  Document,
  PDFViewer,
  Font,
  renderToStream,
  render,
  Text,
} from '@react-pdf/renderer';

import dayjs from 'dayjs';

const { CLOUDFRONT_URL, WEBSITE_URL } = process.env;
Font.register({
  family: 'Poppins',

  fonts: [
    {
      src: `${CLOUDFRONT_URL}/files/fonts/Poppins-Regular.ttf`,
      fontStyle: 'normal',
      fontWeight: 400,
    },
    {
      src: `${CLOUDFRONT_URL}/files/fonts/Poppins-Medium.ttf`,

      fontWeight: '500',
    },
    {
      src: `${CLOUDFRONT_URL}/files/fonts/Poppins-SemiBold.ttf`,

      fontWeight: '600',
    },
  ],
});

function Pdf({ orders, title }) {
  const documentProps = {
    title,
    author: WEBSITE_URL,
    pdfVersion: '1.7',
    producer: WEBSITE_URL,
  };

  const styles = {
    page: {
      padding: '30pt',
      fontFamily: 'Poppins',
      fontSize: '9pt',
      boxSizing: 'border-box',
      password: '123',
    },
  };
  return (
    <Document {...documentProps}>
      {orders.map((order) => {
        return (
          <>
            <Page size="A4" className={'p-5'} style={styles.page} wrap>
              <PackingSlip order={order} />
            </Page>
            <Page size="A4" className={'p-5'} style={styles.page} wrap>
              <OrderReceipt order={order} />
            </Page>
          </>
        );
      })}
    </Document>
  );
}

export default Pdf;
