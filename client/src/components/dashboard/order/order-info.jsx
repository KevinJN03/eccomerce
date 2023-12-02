import order_icon from '../../../assets/icons/profile-icons/package.svg';
import calendar_icon from '../../../assets/icons/profile-icons/calender.png';
import paypal_icon from '../../../assets/icons/payment-icons/paypal.svg';
import logos from '../payment-methods/logos.jsx';
function OrderNumberDate({ icon, title, text }) {
    return (
        <div className="flex flex-row items-center">
            <div className="flex flex-1 flex-row flex-nowrap items-center gap-x-3">
                <img src={icon} alt="box outline icon" className="h-6 w-6" />
                <h3 className="text-dark-gray font-gotham text-s">{title}</h3>
            </div>

            <p className="flex-1 text-sm">{text}</p>
        </div>
    );
}

function Order_Info({}) {
    return (
        <section className="order-info-wrapper">
            <section className="top flex flex-col gap-y-1 bg-white p-6 py-8">
                <h3 className="font-gotham text-lg">ORDER DETAILS</h3>
                <p className="text-dark-gray">
                    Thanks for your order! Check out the details below.
                </p>
            </section>
            <section className="middle mt-3">
                <div className="flex flex-col gap-y-4 bg-white p-6">
                    <OrderNumberDate
                        text={'12345'}
                        title={'ORDER NO.:'}
                        icon={order_icon}
                    />
                    <OrderNumberDate
                        text={'12345'}
                        title={'ORDER DATE:'}
                        icon={calendar_icon}
                    />

                    <div className="border-t-[1px]"></div>

                    <button
                        type="button"
                        className="self-start border-2 px-6 py-[10px] font-gotham tracking-wider !text-primary hover:!bg-[var(--light-grey)]"
                    >
                        RETURNS INFORMATION
                    </button>
                </div>

                <div className="mt-3 bg-white p-6">
                    <h3 className="border-b-[1px] py-4 font-gotham text-s tracking-wide">
                        CANCELLATION DETAILS
                    </h3>

                    <h3 className="text-dark-gray mt-6 font-gotham text-s tracking-wider">
                        REASON FOR CANCELLATION:
                    </h3>
                    <p className="mt-2 text-sm ">No longer required</p>
                </div>

                <div className="mt-3 bg-white p-6">
                    <div className="top border-b-2 pb-6">
                        <p>ORDER STATUS:</p>

                        <p>
                            ORDER CANCELLED <span>1 Item</span>
                        </p>
                        <p>
                            Looks like you cancelled your order. A confirmation
                            was sent to the email address associated with your
                            ASOS account.
                        </p>
                    </div>

                    <div className="middle">
                        <div className="w-44 hover:underline">
                            <img
                                className="mt-6 h-56 w-44"
                                src="https://images.asos-media.com/products/image/205321575-1-washedteal?wid=200&fit=constrain"
                            />

                            <p className="w-44">
                                Reclaimed Vintage waffle beanie in washed teal
                            </p>
                        </div>

                        <p>£6.99</p>

                        <p>WASHED TEAL</p>
                        <p>One Size</p>
                    </div>
                </div>

                <div className="mt-3 bg-white p-6">
                    <h3 className="border-b-2 pb-5 font-gotham text-sm">
                        PAYMENT DETAILS
                    </h3>

                    <div className="mt-5 flex flex-row items-center gap-x-4">
                        <img
                            src={paypal_icon}
                            alt=""
                            className="h-8 w-12 rounded-sm border-2"
                        />
                        <p className="text-sm">PayPal</p>
                    </div>
                </div>

                <div className="order-details mt-3 bg-white p-6">
                    <h3 className='text-sm font-gotham pb-6 border-b-2'>ORDER TOTAL</h3>
                    <div>
                        sub
                    </div>
                </div>
            </section>
            <section className="bottom"></section>
        </section>
    );
}

export default Order_Info;
