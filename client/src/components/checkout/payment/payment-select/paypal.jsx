import paypal_logo from '../../../../assets/icons/payment-icons/paypal.svg';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
function PayPalSelect({}) {
    return (
        <section className="paypal-select flex flex-col gap-y-5">
            <div className="top flex flex-row items-center gap-x-3">
                <img
                    src={paypal_logo}
                    alt="paypal icon"
                    className="m-0 h-6 w-8 py-[2px] object-contain bg-gray-50  border-[1px] rounded-sm  "
                />
                <p>PayPal</p>
            </div>
            <div className="bottom flex flex-row gap-x-3">
                <span className="info-btn-wrapper h-8 w-8">
                    <InfoOutlinedIcon style={{ fontSize: '24px' }} />
                </span>

                <p className="text-sm">
                    Hit the PayPal button below to sign into PayPal and confirm
                    your payment.
                </p>
            </div>
        </section>
    );
}

export default PayPalSelect;
