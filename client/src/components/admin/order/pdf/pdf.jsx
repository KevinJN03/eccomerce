import { useEffect, useRef, useState } from 'react';
import OrderReceipt from './orderReciept';
import PackingSlip from './packingSlip.';
import { adminAxios } from '../../../../api/axios';

import PoppinsRegular from '../../../../assets/fonts/Poppins-Regular.ttf';
import PoppinsMedium from '../../../../assets/fonts/Poppins-Medium.ttf';
import PoppinsSemiBold from '../../../../assets/fonts/Poppins-SemiBold.ttf';
import { Page, Document, PDFViewer, Font } from '@react-pdf/renderer';

import ReactDOMServer from 'react-dom/server';
import dayjs from 'dayjs';

Font.register({
    family: 'Poppins',

    fonts: [
        { src: PoppinsRegular, fontStyle: 'normal', fontWeight: 400 },
        {
            src: PoppinsMedium,

            fontWeight: '500',
        },
        {
            src: PoppinsSemiBold,

            fontWeight: '600',
        },
    ],
});

function Pdf({}) {
    const [order, setOrder] = useState({});
    useEffect(() => {
        adminAxios
            .get(`order/DFI4DI7Q7CC5`)
            .then(({ data }) => {
                setOrder(() => data?.order);
            })
            .catch((error) => {
                console.error('error at pdf:', error);
            });
    }, []);

    const timeNow = dayjs().unix();
    console.log({ timeNow });

    const documentProps = {
        title: timeNow.toString(),
        author: 'glamo',
        // pdfVersion: '1.7',
    };

    const styles = {
        page: {
            padding: '30pt',
            fontFamily: 'Poppins',
            fontSize: '9pt',
            boxSizing: 'border-box'
        },
    };

    const html = (component) => {
        return ReactDOMServer.renderToStaticMarkup(component);
    };
    return (
        <PDFViewer className="min-h-screen w-full">
            {order?._id && (
                <Document {...documentProps}>
                    <Page size="A4" className={'p-5'} style={styles.page} wrap >
                      
                        <PackingSlip order={order} />
                    </Page>
                    <Page size="A4" className={'p-5'} style={styles.page} wrap >
                      
                      <OrderReceipt order={order} />
                  </Page>
                </Document>
            )}
        </PDFViewer>
    );
}

export default Pdf;
