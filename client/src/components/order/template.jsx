import Checkout_Header from '../checkout/checkout_header';

function Template({children}) {
    return (
        <section className="flex h-full min-h-screen w-full flex-wrap justify-center bg-[var(--light-grey)]">
            <section className="mb-10 flex w-full max-w-4xl flex-col flex-nowrap">
                <div className="mb-5 max-w-[580px]">
                    <Checkout_Header
                        text={'CHECKOUT'}
                        disableIcon={true}
                        className={'ml-auto mr-0'}
                    />
                </div>

                {children}
            </section>
            <footer className="sticky bottom-0 left-0 mt-auto flex w-full basis-full items-center justify-center bg-white py-5">
                GLAMO Help
            </footer>
        </section>
    );
}

export default Template;
