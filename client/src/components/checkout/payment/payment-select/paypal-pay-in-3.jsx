import { useState } from 'react';
import paypal_logo from '../../../../assets/icons/payment-icons/paypal.svg';
import { Information } from './Information';
import calculateTotal from '../../../common/calculateTotal';
function PayPalPayIn3({}) {
    const [futureUse, setFutureUse] = useState(true);
    const { withShipping } = calculateTotal();

    const paymentAmount = (withShipping / 3).toFixed(2);
    return (
        <section className="">
            <div className="top flex flex-row items-center gap-x-3">
                <img
                    src={paypal_logo}
                    alt="paypal icon"
                    className="paypal-icon m-0 h-6 w-8 rounded-sm border-[1px] bg-gray-50 object-contain py-[2px]  "
                />
                <p className="text-sm">PayPal</p>
            </div>

            <div className="bottom mt-4 flex flex-col gap-y-4">
                <span className="mt-4 flex flex-row items-center gap-x-3">
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
                    extraInfo={{
                        msg: 'MORE INFO',
                        className: 'basis-0 font-semibold whitespace-nowrap hover:underline',
                    }}
                />

                <div className="border-t-[1px] py-3">
                    
                </div>
            </div>
        </section>
    );
}

export default PayPalPayIn3;
