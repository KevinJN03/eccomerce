import React, { useEffect, useRef, useState } from 'react';

import { adminAxios } from '../../../../api/axios.js';

import GLoader from '../../../portal/socialRegister/gloader';
import { useLocation } from 'react-router-dom';

function Pdf({}) {
    const [pdfLink, setPdfLink] = useState('');

    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const iframeRef = useRef();
    useEffect(() => {
        const file = location.pathname.split('/').slice(-1);
        console.log(file);

        adminAxios
            .post('pdf/url', { file: `${file}.pdf` })
            .then(({ data }) => {
                setPdfLink(data.url);
                setLoading(false);
            })
            .catch((error) =>
                console.error('error while getting presign url', error)
            );
    }, []);

    return (
        <section className="flex min-h-screen min-w-full items-center justify-center">
            {!loading ? (
                <iframe
                    id="iframe"
                    ref={iframeRef}
                    className="min-h-screen w-full"
                    src={pdfLink}
                    frameBorder="0"
                />
            ) : (
                <GLoader />
            )}
        </section>
    );
}

export default Pdf;
