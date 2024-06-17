import { useState } from 'react';
import OptionSelection from '../order/home/optionSelection';
import ThemeBtn from '../../buttons/themeBtn';
import Payment_Methods from '../../cart/payment_methods';
import icon from '../../../assets/icons/dubiety-bw.png';
import { KeyboardBackspaceRounded } from '@mui/icons-material';
import dayjs from 'dayjs';
function PaymentSettings({}) {
    const [status, setStatus] = useState('payment_methods');
    return (
        <section className="w-full">
            <header className="flex flex-col gap-7">
                <h2 className="font-EBGaramond text-5xl">Payment settings</h2>{' '}
                <OptionSelection
                    options={[
                        { text: 'Payment Methods', select: 'payment_methods' },
                        { text: 'Currency', select: 'currency' },
                        { text: 'Billing', select: 'billing' },
                        { text: 'Address', select: 'address' },
                    ]}
                    setStatus={setStatus}
                    status={status}
                />
            </header>

            <section>
                <h2 className="text-2xl font-semibold">Glamo payments</h2>

                <p className="mt-4 max-w-2xl text-base">
                    You're getting our highest level of payment protection and
                    support while offering buyers the most payment options.{' '}
                    <span className="underline underline-offset-1 ">
                        Learn more
                    </span>
                </p>

                <section className="mt-8">
                    <p className="!mb-3 text-xl font-semibold">Bank details</p>

                    <section className="flex w-full gap-10">
                        <div className="flex flex-1 flex-col gap-0.5">
                            <p className="text-base font-semibold">
                                Kevin Jean
                            </p>

                            <div className=" flex items-center justify-between">
                                <p className="text-base">
                                    GB account ending in{' '}
                                    <span className="font-semibold">1234</span>
                                </p>

                                <ThemeBtn
                                    text={'edit'}
                                    bg={'bg-light-grey'}
                                    className={'!px-4 py-2'}
                                >
                                    <p className="font-medium text-black ">
                                        Edit
                                    </p>
                                </ThemeBtn>
                            </div>
                            <p className="w-fit rounded-full bg-green-300 px-2 py-1">
                                Verified
                            </p>
                        </div>

                        <div className="flex-1">
                            <label className="daisy-form-control w-full ">
                                <div className="daisy-label !pt-0">
                                    <span className="daisy-label-text !text-base  font-semibold">
                                        Deposit schedule
                                    </span>
                                </div>
                                <select className="daisy-select daisy-select-bordered input !w-full !max-w-full">
                                    {[
                                        {
                                            text: 'Every day',
                                            date: dayjs().add(1, 'day'),
                                        },
                                        {
                                            text: ' Once per week',
                                            date: dayjs().add(1, 'week'),
                                        },
                                        {
                                            text: 'Every two weeks',
                                            date: dayjs().add(2, 'week'),
                                        },
                                        {
                                            text: ' Once per month',
                                            date: dayjs().add(1, 'month').startOf('month'),
                                        },
                                    ].map(({ text, date }) => {
                                        return (
                                            <option>{`${text} (next on ${date.format('MMM D, YYYY')})`}</option>
                                        );
                                    })}
                                </select>
                            </label>
                        </div>
                    </section>
                </section>
            </section>

            <section className="mt-5">
                <h2 className="text-lg font-semibold">
                    Accepted payment options
                </h2>

                <div className="w-fit ">
                    <Payment_Methods
                        className={
                            'h-7 w-10 !rounded-md border-none !object-cover'
                        }
                    />
                </div>
            </section>

            <section className="mt-8 flex items-center gap-5  bg-blue-200 p-6">
                <div className="h-24 w-24 rounded-full bg-white p-4">
                    <img
                        src={icon}
                        alt="dubiety man"
                        className="h-fit w-fit object-cover"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="font-EBGaramond text-3xl">Got questions?</h2>
                    <div className="group flex cursor-pointer flex-nowrap gap-1">
                        <p className=" cursor-pointer text-base font-medium">
                            Read the payment FAQ{' '}
                        </p>

                        <div className="transition-all group-hover:!translate-x-[0.4rem] ">
                            <KeyboardBackspaceRounded className="rotate-180" />
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default PaymentSettings;
