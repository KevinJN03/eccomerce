import { useRef, useState } from 'react';
import Checkout_Header from '../checkout/checkout_header';
import { useInView } from 'framer-motion';
import MessageFooter from '../dashboard/messageFooter';
import TemplateProvider from '../../context/templeteContext';
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

    console.log({isInView})
    return (
        <TemplateProvider value={value}>
            <section className="flex  relative h-full min-h-screen w-full flex-wrap justify-center bg-[var(--light-grey)]">
                <section className=" relative pb-16 flex w-full max-w-4xl flex-col flex-nowrap md:px-20">
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
