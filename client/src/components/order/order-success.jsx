import disableLayout from '../../hooks/disableLayout';
import Checkout_Header from '../checkout/checkout_header';
import recycle_logo from '../../assets/icons/recycle.png';
import snapchat_icon from '../../assets/icons/Snapchat-Ghost-Outlined-Logo.wine (1).svg';
import facebook_icon from '../../assets/icons/facebook.svg';
import instagram_icon from '../../assets/icons/instagram.svg';

import image from '../../assets/images/order-photo-women.jpg';

function OrderInfo({ header, text, headerClassName }) {
    return (
        <div className="flex flex-row flex-nowrap">
            <span className='flex-1'>
               <h3
                className={`${headerClassName || ''} font-gotham !text-gray-500 text-opacity-5`}
            >
                {header}
            </h3>  
            </span>
           
            <p className="text-base flex-1 break-all">{text}</p>
        </div>
    );
}
function Order_Success({}) {
    disableLayout();
    return (
        <section className="flex h-full min-h-screen w-full flex-wrap justify-center bg-[var(--light-grey)]">
            <section className="mb-10 flex w-full max-w-4xl flex-col flex-nowrap">
                <div className="mb-5 max-w-[580px]">
                    <Checkout_Header
                        text={'CHECKOUT'}
                        disableIcon={true}
                        className={'ml-auto mr-0'}
                    />
                </div>

                <section className="flex flex-row flex-nowrap gap-x-3 ">
                    <div className="left flex max-w-[580px] flex-1 flex-col flex-nowrap">
                        <div className=" bg-white p-6">
                            <h3 className="mb-4 font-gotham text-lg tracking-wider !text-primary">
                                THANK YOU FOR YOUR ORDER
                            </h3>

                            <p className="text-s text-gray-500">
                                Please check your inbox, as a confirmation email
                                is on its way.
                            </p>

                            <div className="mt-6 flex flex-col gap-y-3">
                                <OrderInfo
                                    header={'ORDER TOTAL:'}
                                    text={'Received'}
                                />
                                <OrderInfo
                                    header={'ORDER REFERENCE:'}
                                    text={'Received'} headerClassName={'w-5'}
                                />

                                <OrderInfo
                                    header={'DELIVERY:'}
                                    text={'Received111111111111111111111111111111111111111111111111111111111111111111111111'}
                                />

                                <OrderInfo
                                    header={'ORDER STATUS:'}
                                    text={'Received'}
                                />
                            </div>
                        </div>

                        <div className="mt-3 flex  flex-col flex-nowrap gap-y-4 bg-white p-6 pt-12 ">
                            <p className="cursor-pointer text-sm font-[400] hover:underline">
                                Cancel this order
                            </p>
                            <p className="cursor-pointer text-sm font-[400] hover:underline">
                                My Account
                            </p>
                            <p className="cursor-pointer text-sm font-[400] hover:underline">
                                Returns Policy
                            </p>
                        </div>

                        <div className="mt-3 flex flex-row items-center gap-x-4 bg-white p-6">
                            <img
                                src={recycle_logo}
                                alt="recyle logo"
                                className="h-7 w-7 object-contain"
                            />
                            <p>
                                Our plastic bags and cardboard boxes are 100%
                                recyclable
                            </p>
                        </div>

                        <button className=" mt-8 w-10/12 self-center !bg-primary py-3 font-gotham tracking-wider text-white transition-all hover:!bg-black">
                            CONTINUE SHOPPING
                        </button>
                    </div>
                    <div className="right flex-[0.6]">
                        <div className="top flex w-full flex-col items-center gap-y-5 bg-blue-200 p-7 pt-8">
                            <h3 className="font-gotham text-lg">
                                HAVE YOUR SAY
                            </h3>
                            <p className="w-3/4 text-center">
                                Take our two-minute survey and tell us what you
                                think…
                            </p>

                            <button
                                type="button"
                                className="w-full border-2 bg-white py-3 font-gotham hover:bg-opacity-80"
                            >
                                LET'S GO
                            </button>
                        </div>

                        <div className="middle mt-5 flex flex-col items-center">
                            <h3 className="font-gotham text-lg">
                                GET MORE GLAMO ON:
                            </h3>

                            <div className="mt-3 flex flex-row flex-nowrap gap-x-3">
                                <div className="flex h-10 w-10  cursor-pointer items-center justify-center rounded-full bg-violet-500 p-1 transition-all hover:bg-opacity-70">
                                    <img
                                        src={instagram_icon}
                                        alt="snapchat icon"
                                        className="h-[80%] w-[80%]"
                                    />
                                </div>

                                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#3b5998] p-2 transition-all hover:bg-opacity-70">
                                    <img
                                        src={facebook_icon}
                                        alt="snapchat icon"
                                        className="h-[80%] w-[80%]"
                                    />
                                </div>
                                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#FFFC00] transition-all hover:bg-opacity-70">
                                    <img
                                        src={snapchat_icon}
                                        alt="snapchat icon"
                                        className="h-[80%] w-[80%]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bottom relative mt-4 h-[340px] w-full ">
                            <img
                                src={image}
                                alt=""
                                className="h-full w-full bg-black object-cover object-bottom mix-blend-darken blur-[0.5px]"
                            />

                            <div className="absolute left-2/4 top-2/4 mx-auto w-full translate-x-[-50%] translate-y-[-50%] p-6 text-center ">
                                <h3 className="order-shadow font-gotham text-5xl leading-[1.2] text-white">
                                    Looking for more ?
                                </h3>

                                <p className="order-shadow mt-7 font-gotham text-lg leading-6 text-white">
                                    Discover over 700 vintage boutiques and
                                    independent brands on out sister site, GLAMO
                                    Marketplace
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <footer className="sticky bottom-0 left-0 mt-auto flex w-full basis-full items-center justify-center bg-white py-5">
                GLAMO Help
            </footer>
        </section>
    );
}

export default Order_Success;
