import { useState } from 'react';
import afterPay_logo from '../../../../assets/icons/payment-icons/afterpay.png';
import { Information } from './Information';
import calculateTotal from '../../../common/calculateTotal';

function ClearPaySelect({}) {
    const [futureUse, setFutureUse] = useState(true);
    const { withShipping } = calculateTotal();

    const paymentAmount = (withShipping / 4).toFixed(2);
    return (
        <section className="flex flex-col flex-nowrap gap-y-7 pr-32">
            <div className="top flex flex-row items-center gap-x-3">
                <img
                    src={afterPay_logo}
                    alt="paypal icon"
                    className="paypal-icon m-0 h-6 w-8 rounded-sm border-[1px] bg-gray-50 object-cover"
                />
                <p className="text-sm">ClearPay</p>
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
                    msg={`4 interest free payments of £${paymentAmount}`}
                    className={'!flex-row'}
                    extraInfo={{
                        msg: 'MORE INFO',
                        className:
                            'font-semibold text-sm whitespace-nowrap hover:underline cursor-pointer ml-8 tracking-wide',
                    }}
                />

                <section className="flex flex-col gap-y-4 border-y-[1px] py-3">
                    <div className=" flex flex-row flex-nowrap justify-between px-1">
                        {Array(4)
                            .fill(1)
                            .map((item, idx) => {
                                return (
                                    <p
                                        key={idx}
                                        className="text-sm font-semibold"
                                    >
                                        {paymentAmount}
                                    </p>
                                );
                            })}
                    </div>
                    <div className="flex h-[14px] w-full flex-row flex-nowrap items-center justify-between rounded-lg bg-gray-500 px-[3px] py-0">
                        {Array(4)
                            .fill(1)
                            .map((item, idx) => {
                                return (
                                    <span
                                        key={idx}
                                        className="h-2 w-2 rounded-full bg-white "
                                    ></span>
                                );
                            })}
                    </div>

                    <div className=" flex flex-row flex-nowrap justify-between">
                        {[
                            'First payment',
                            'After 2 weeks',
                            'After 4 weeks',
                            'After 6 weeks',
                        ].map((item, idx) => {
                            return (
                                <span
                                    key={idx}
                                    className={`${
                                        idx == 0
                                            ? 'justify-start'
                                            : idx == 3
                                            ? 'justify-end'
                                            : ''
                                    } flex w-full flex-1 items-center `}
                                >
                                    <p
                                        className={`w-2/4 text-s font-light  ${
                                            idx == 0
                                                ? 'text-left'
                                                : idx == 3
                                                ? '!self-end text-right'
                                                : idx == 2
                                                ? 'ml-auto  mr-[10%] !self-end text-center'
                                                : idx == 1 &&
                                                  'ml-[10%] mr-auto self-start text-center'
                                        }`}
                                    >
                                        {item}
                                    </p>
                                </span>
                            );
                        })}
                    </div>
                </section>
            </div>

            <div className="bottom ">
                <p
                    className=" mb-4
            text-sm leading-5"
                >
                    By placing and completing your order, I agree to Clearpay's{' '}
                    <a
                        className="cursor-pointer underline"
                        href="https://www.clearpay.co.uk/en-GB/terms-of-service"
                        target="_blank"
                    >
                        T&Cs
                    </a>
                    . Clearpay is unregulated Credit. Use responsibly. Late fees
                    of up to £24 per order apply.
                </p>

                <p
                    className="
            mb-7 text-sm leading-5"
                >
                    After clicking{' '}
                    <span className="font-semibold">
                        "Pay now with Clearpay"
                    </span>
                    , you will be redirected to Clearpay to complete your
                    purchase securely.
                </p>
            </div>
        </section>
    );
}

export default ClearPaySelect;
