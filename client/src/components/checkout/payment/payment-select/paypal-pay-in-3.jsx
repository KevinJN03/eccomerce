import { useState } from 'react';
import paypal_logo from '../../../../assets/icons/payment-icons/paypal.svg';
import { Information } from './Information';
import calculateTotal from '../../../common/calculateTotal';
function PayPalPayIn3({}) {
    const [futureUse, setFutureUse] = useState(true);
    const { withShipping } = calculateTotal();

    const paymentAmount = (withShipping / 3).toFixed(2);
    return (
        <section className="pr-32 flex flex-col flex-nowrap gap-y-7">
            <div className="top flex flex-row items-center gap-x-3">
                <img
                    src={paypal_logo}
                    alt="paypal icon"
                    className="paypal-icon m-0 h-6 w-8 rounded-sm border-[1px] bg-gray-50 object-contain py-[2px]  "
                />
                <p className="text-sm">PayPal</p>
            </div>

            <div className="middle flex flex-col gap-y-4">
                <span className=" flex flex-row items-center gap-x-3">
                    <div className="w-8">
                        <input
                            onChange={() =>
                                setFutureUse((prevState) => !prevState)
                            }
                            type="checkbox"
                            className="daisy-checkbox daisy-checkbox-md rounded-none "
                            checked={futureUse}
                        />
                    </div>

                    <p className="text-sm">Save for future use</p>
                </span>

                <Information
                    msg={`3 interest free payments of £${paymentAmount}`}
                    className={'!flex-row'}
                    extraInfo={{
                        msg: 'MORE INFO',
                        className:
                            'font-semibold text-sm whitespace-nowrap hover:underline cursor-pointer ml-8 tracking-wide',
                    }}
                />

                <section className="flex flex-col gap-y-4 border-y-[1px] py-3">
                    <div className=" flex flex-row flex-nowrap justify-between px-1">
                        <p className="text-sm font-semibold">{paymentAmount}</p>
                        <p className="text-sm font-semibold">{paymentAmount}</p>
                        <p className="text-sm font-semibold">{paymentAmount}</p>
                    </div>
                    <div className="flex h-[14px] w-full flex-row flex-nowrap items-center justify-between rounded-lg bg-gray-500 px-[3px] py-0">
                        <span className="h-2 w-2 rounded-full bg-white"></span>
                        <span className="h-2 w-2 rounded-full bg-white "></span>
                        <span className="h-2 w-2 rounded-full bg-white "></span>
                    </div>

                    <div className=" flex flex-row flex-nowrap justify-between">
                        <span className="flex flex-1 items-center justify-start">
                            <p className="w-1/4 text-s font-light ">
                                First payment
                            </p>
                        </span>
                        <span className="flex flex-1 items-center  justify-center">
                            <p className="text-center text-s font-light">
                                1 month later
                            </p>
                        </span>

                        <span className="flex flex-1 items-center  justify-end">
                            <p className=" w-2/4 text-right text-s font-light">
                                2 months later
                            </p>
                        </span>
                    </div>
                </section>
            </div>

            <div className="bottom ">
                <p className='
                mb-7 text-sm'>
                    Pay in 3 is a form of credit, so carefully consider whether
                    the purchase is affordable and how you will make the
                    repayments. Be aware of the possible impact of using Pay in
                    3 and of missing payments, including making other borrowing
                    more difficult or more expensive. Pay in 3 eligibility is
                    subject to status and approval. 18+ UK residents only. See
                    product{' '}
                    <a
                        href="https://www.paypal.com/uk/webapps/mpp/paypal-payin3/terms"
                        target="_blank"
                        className="underline"
                    >
                        terms
                    </a>{' '}
                    for more details.
                </p>

                <Information
                    msg={
                        'Hit the PayPal button below to sign into PayPal and confirm your payment.'
                    }
                />
            </div>
        </section>
    );
}

export default PayPalPayIn3;
