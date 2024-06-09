import RevenueContainer from './revenueContainer';

function PaymentAccount({}) {
    return (
        <section className="">
            <header>
                <h2 className="font-EBGaramond text-5xl">Payment account</h2>
            </header>
            <section className=" mt-8 flex w-full gap-5">
                <RevenueContainer
                    title={'Amount due for June'}
                    includeQuestion={true}
                    amount={0}
                    text={'Your sales covered your fees'}
                >
                    <div className="border-t border-dark-gray pt-4">
                        <p className="cursor-pointer font-medium underline-offset-2 hover:underline">
                            Update billing settings
                        </p>
                    </div>
                </RevenueContainer>
                <RevenueContainer
                    title={'Available for deposit'}
                    amount={2}
                    underline
                >
                    <div className="flex w-full justify-between border-t border-dark-gray pt-4">
                        <p className="font-medium">
                            Update billing settings
                            <span className="block cursor-pointer text-left font-normal underline">
                                weekly
                            </span>
                        </p>

                        <p className="font-medium">
                            Bank account{' '}
                            <span className="block cursor-pointer text-right font-normal underline">
                                ...1234
                            </span>
                        </p>
                    </div>
                </RevenueContainer>
            </section>
            <section>
                <h2 className="mt-10 text-2xl font-semibold">
                    Activity Summary
                </h2>
            </section>
        </section>
    );
}

export default PaymentAccount;
