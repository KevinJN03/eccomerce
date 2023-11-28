import klarna_logo from '../../../../assets/icons/payment-icons/klarna.svg';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import { useState } from 'react';
import { Information } from './Information';
import { createRange } from '../../../dashboard/payment-methods/ranges';
import localeData from 'dayjs/plugin/localeData';
import dayjs from 'dayjs';
import { useCheckoutContext } from '../../../../context/checkOutContext';
import ErrorMessage, {
    ErrorMessagePointerUp,
} from '../../../Login-SignUp/errorMessage';
import { usePaymentTypeContext } from '../../../../context/paymentTypeContext';

dayjs.extend(localeData);

function CheckItem({ msg }) {
    return (
        <div className="flex flex-row items-center gap-x-3 ">
            <CheckSharpIcon style={{ fontSize: '24px' }} />
            <p className="text-sm font-semibold">{msg}</p>
        </div>
    );
}

function Select({ header, dataArray }) {
    const { klarnaDob, setKlarnaDob } = useCheckoutContext();
    const handleOnChange = (e) => {
        setKlarnaDob((prevState) => ({
            ...prevState,
            [header.toLowerCase()]: e.target.value,
            error: null,
        }));
    };

    return (
        <select
            onChange={handleOnChange}
            className={`${
                klarnaDob?.error ? 'border-red-500' : 'border-black'
            } dob-select border-[1px] px-5 py-3 text-s focus:outline`}
        >
            <option className="text-left indent-2">{header}</option>

            {dataArray.map((item, idx) => {
                const selected =
                    klarnaDob?.[header.toLowerCase()] == item || false;
                return (
                    <>
                        {header == 'Month' && (
                            <option
                                selected={
                                    klarnaDob?.[header.toLowerCase()] ==
                                        idx + 1 || false
                                }
                                value={('0' + idx + 1).toString().slice(-2)}
                                className="text-left text-s"
                            >
                                {item}
                            </option>
                        )}

                        {header == 'Day' && (
                            <option
                                selected={selected}
                                value={('0' + item).toString().slice(-2)}
                                className="text-left text-s"
                            >
                                {item}
                            </option>
                        )}

                        {header == 'Year' && (
                            <option
                                value={item}
                                className="text-left text-s"
                                selected={selected}
                            >
                                {item}
                            </option>
                        )}
                    </>
                );
            })}
        </select>
    );
}

function KlarnaSelect({}) {
    const [futureUse, setFutureUse] = useState(true);
    const { klarnaDob, setKlarnaDob } = useCheckoutContext();
    const { selectedMethod, setNextView } = usePaymentTypeContext();
    const days = createRange(1, 31, 1);
    const months = dayjs.months();

    const todayYear = dayjs().year();
    const hundredYearFromToday = todayYear - 100;
    const yearWithAdult18 = todayYear - 18;
    const years = createRange(hundredYearFromToday, yearWithAdult18, 1);
    return (
        <section className="klarna-select">
            <div className="top flex flex-row items-center gap-x-3">
                <img
                    src={klarna_logo}
                    alt="klarna logo"
                    className="h-6 w-8 object-contain"
                />
                <p className="text-sm">{selectedMethod.title}</p>
            </div>
            <div className="middle my-8 ">
                <div className="middle-top px-2">
                    <CheckItem msg={'Shop today and pay in 30 days.'} />
                    <CheckItem msg={'Buyer Protection included.'} />
                    <CheckItem
                        msg={'Trusted by more than 150 million users.'}
                    />
                    <span className="mb-4 mt-4 flex flex-row items-center gap-x-3">
                        <InfoOutlinedIcon style={{ fontSize: '24px' }} />
                        <p>
                            <a
                                href="https://www.klarna.com/uk/smoooth/"
                                target="_blank"
                                className="underline "
                            >
                                Learn more
                            </a>{' '}
                            about your payment options
                        </p>
                    </span>

                    <p className=" border-t-[thin] py-3">
                        By continuing, I accept the terms of the{' '}
                        <a
                            className="underline"
                            target="_blank"
                            href="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/en_gb/user"
                        >
                            Klarna Shopping Service
                        </a>{' '}
                        and confirm that I have read the{' '}
                        <a
                            className="underline"
                            target="_blank"
                            href="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/en_gb/privacy"
                        >
                            Privacy Notice
                        </a>{' '}
                        and the{' '}
                        <a
                            className="underline"
                            target="_blank"
                            href="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/en_gb/cookie_purchase"
                        >
                            Cookie Notice
                        </a>
                        .
                    </p>
                </div>

                <span className="mt-4 flex flex-row items-center gap-x-4">
                    <input
                        onChange={() => setFutureUse((prevState) => !prevState)}
                        type="checkbox"
                        className="daisy-checkbox rounded-none"
                        checked={futureUse}
                    />
                    <p className="text-sm">Save for future use</p>
                </span>

                <div className="mt-6 flex flex-col">
                    <h3 className="mb-3 text-[16px] font-semibold text-gray-400 ">
                        DATE OF BIRTH:
                    </h3>
                    <div className="relative mb-4 flex w-8/12 flex-row gap-x-1">
                        <div className="relative mb-4 flex flex-row gap-x-1">
                            <Select dataArray={days} header={'Day'} />
                            <Select
                                dataArray={[1, 2, 3]}
                                header={'Month'}
                                dataArray={months}
                            />
                            <Select
                                dataArray={[1, 2, 3]}
                                header={'Year'}
                                dataArray={years}
                            />
                        </div>

                        {klarnaDob['error'] && (
                            <ErrorMessagePointerUp
                                msg={klarnaDob['error']}
                                className={'!left-0 !top-16'}
                            />
                        )}
                    </div>

                    <p className="text-sm font-light text-gray-400">
                        Klarna needs your date of birth to confirm your
                        identity. You must be 18 years of age to use Klarna.
                    </p>

                    <p className="mt-4 text-sm">
                        Klarna's Pay in 3 and Pay in 30 is an unregulated credit
                        agreement. Borrowing more than you can afford or paying
                        late may negatively impact your financial status and
                        ability to obtain credit. 18+, UK residents only.
                        Subject to status. Late fees apply. By continuing I
                        accept the{' '}
                        <a
                            className={'underline '}
                            href="https://www.klarna.com/uk/terms-and-conditions/"
                        >
                            Ts&Cs
                        </a>
                        .
                    </p>
                </div>
            </div>
            <div className="bottom">
                <Information
                    msg={
                        'Buy now and pay Klarna by 5 January, 2024, once your order has been dispatched.'
                    }
                    className="w-full flex-wrap"
                    extraInfo={{
                        msg: 'MORE INFO',
                        className:
                            'text-base font-light text-black underline cursor-pointer',
                    }}
                />
            </div>
        </section>
    );
}

export default KlarnaSelect;
