import paypal_logo from '../../../../assets/icons/payment-icons/paypal.svg';

import { Information } from './Information';

function PayPalSelect({}) {
    return (
        <section className="paypal-select flex flex-col gap-y-8">
            <div className="top flex flex-row items-center gap-x-3">
                <img
                    src={paypal_logo}
                    alt="paypal icon"
                    className="paypal-icon m-0 h-6 w-8 rounded-sm border-[1px] bg-gray-50 object-contain py-[2px]  "
                />
                <p className="text-sm">PayPal</p>
            </div>
            <Information
                msg={
                    'Hit the PayPal button below to sign into PayPal and confirm your payment.'
                }
               
            />
        </section>
    );
}

export default PayPalSelect;
