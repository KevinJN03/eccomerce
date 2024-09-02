import { useRef, useState } from 'react';
import Checkout_Header from '../checkout/checkout_header.jsx';
import { useInView } from 'framer-motion';
import MessageFooter from '../dashboard/messageFooter.jsx';
import TemplateProvider from '../../context/templeteContext.jsx';
function Template({ children }) {
    const footerRef = useRef();
    const isInView = useInView(footerRef);

    const [footerMessage, setFooterMessage] = useState({
        text: 'null',
        success: null,
    });
    const value = {
        footerMessage,
        setFooterMessage,
        isInView,
    };

    console.log({ isInView });
    return (
        <TemplateProvider value={value}>
            <section className="relative  flex h-full min-h-screen w-full flex-wrap justify-center bg-[var(--light-grey)]">
                <section className=" relative flex w-full max-w-4xl flex-col flex-nowrap pb-16 md:px-20">
                    <div className="mb-5 lg:max-w-[580px]">
                        <Checkout_Header
                            text={'CHECKOUT'}
                            disableIcon={true}
                            className={'ml-auto mr-0'}
                        />
                    </div>

                    {children}
                </section>

                <footer
                    ref={footerRef}
                    className=" bottom-0 mt-auto flex w-full justify-center bg-white p-5"
                >
                    GLAMO Help
                </footer>
            </section>
        </TemplateProvider>
    );
}

export default Template;
