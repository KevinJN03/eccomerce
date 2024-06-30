import saleIcon from '../../../assets/icons/shopping.png';
import saleIcon2 from '../../../assets/icons/promo-code.png';
import saleIcon3 from '../../../assets/icons/icons8-sale-price-tag-100.png';
import emailIcon from '../../../assets/icons/email.png';
import BubbleButton from '../../buttons/bubbleButton.jsx';
import ThemeBtn from '../../buttons/themeBtn.jsx';
import _, { property } from 'lodash';
import { DatePicker } from '@mui/x-date-pickers';
function Template({}) {
    const { title, description } = {
        title: 'Create a promo code',
        description: `A promo code is an easy way to share a discount with anyone you choose. It can also be a great way to encourage purchases and build loyalty.`,
    };
    return (
        <section className=" rounded-inherit bg-white min-h-screen h-full">
            <header className="flex flex-nowrap items-center gap-8 rounded-t-inherit bg-blue-200 p-6">
                <img src={saleIcon2} className="h-12 w-12 object-cover" />

                <h2 className="font-EBGaramond text-4xl">{title}</h2>
            </header>
            <body className="mt-10 flex  bg-white h-full flex-col gap-6 px-28 ">
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">
                        Customise your offer details
                    </h3>
                    <p className="text-base">{description}</p>
                </div>

                <section className="flex w-full flex-nowrap gap-5">
                    <div className="left flex-1">
                        <p className="text-lg font-semibold">Discount amount</p>
                    </div>
                    <div className="right flex flex-[2_2_0%] gap-10">
                        <select
                            name=""
                            id=""
                            className="daisy-select daisy-select-bordered input !w-full"
                        ></select>

                        <input
                            type="text"
                            className="daisy-input input w-full"
                        />
                    </div>
                </section>

                <section className="flex w-full flex-nowrap gap-5">
                    <div className="left flex-1">
                        <p className="text-lg font-semibold">Order minimum</p>

                        <p>
                            You can require a minimum spend or number of items
                            for buyers to qualify for your offer.
                        </p>
                    </div>
                    <div className="right flex w-full flex-[2_2_0%] justify-between gap-10">
                        {['none', 'number_of_items', 'order_total'].map(
                            (text) => {
                                return (
                                    <div
                                        className="flex h-fit flex-nowrap items-center gap-2"
                                        key={text}
                                    >
                                        {' '}
                                        <input
                                            type="radio"
                                            className="daisy-radio"
                                            name="order_minimum"
                                        />
                                        <p className="text-sm">
                                            {_.upperFirst(text).replace(
                                                /_/g,
                                                ' '
                                            )}
                                        </p>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </section>

                <section className="flex w-full flex-nowrap gap-5">
                    <div className="left flex-1">
                        <p className="text-lg font-semibold">Duration</p>

                        <p>
                            You can set a date for your code to expire, or leave
                            it open-ended.
                        </p>
                    </div>
                    <div className="right flex w-full flex-[2_2_0%] justify-between gap-10">
                        {[
                            { property: 'start_date' },
                            { property: 'end_date' },
                        ].map(({ property }) => {
                            return (
                                <div key={property}>
                                    <DatePicker />
                                    {property == 'end_date' && (
                                        <div className="mt-3 flex flex-nowrap gap-2">
                                            <input
                                                type="checkbox"
                                                className="daisy-checkbox !daisy-checkbox-xs !rounded-sm "
                                            />
                                            <p>No end date</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
                <section className="flex w-full flex-nowrap gap-5">
                    <div className="left flex-1">
                        <p className="text-lg font-semibold">
                            Custom promo code
                        </p>

                        <p>
                            This is what shoppers will enter at checkout to get
                            a discount. Each code should be unique, and only use
                            letters and numbers.
                        </p>
                    </div>
                    <div className="right flex w-full flex-[2_2_0%] justify-between gap-10">
                        <input
                            type="input"
                            className="daisy-input input !w-full"
                            placeholder="EX. SAVE50"
                        />{' '}
                    </div>
                </section>
            </body>
            <footer className="sticky bottom-0 flex flex-nowrap justify-between px-6 py-5 bg-white shadow-normal">
                <BubbleButton />
                <ThemeBtn text={'Continue'} />
            </footer>
        </section>
    );
}

export default Template;
