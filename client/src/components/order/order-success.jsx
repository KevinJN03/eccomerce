import disableLayout from '../../hooks/disableLayout';
import Checkout_Header from '../checkout/checkout_header';
import recycle_logo from '../../assets/icons/recycle.png';
import snapchat_icon from '../../assets/icons/Snapchat-Ghost-Outlined-Logo.wine (1).svg';
import facebook_icon from '../../assets/icons/facebook.svg';
import instagram_icon from '../../assets/icons/instagram.svg';

import image from '../../assets/images/order-photo-women.jpg';
function Order_Success({}) {
    disableLayout();
    return (
        <section className="flex min-h-screen flex-wrap h-full w-full justify-center bg-[var(--light-grey)]">
            <section className="flex w-full max-w-4xl flex-col flex-nowrap mb-10">
                <div className='max-w-[580px] mb-5'>
                      <Checkout_Header
                    text={'CHECKOUT'}
                    disableIcon={true}
                    className={'ml-auto mr-0'}
                />
                </div>
              
                <section className='flex flex-row flex-nowrap gap-x-4 '>
                    <div className="left flex-1 max-w-[580px] flex flex-col flex-nowrap">
                        <div className=" bg-white p-6">
                            <h3 className="mb-4 font-gotham text-lg tracking-wider !text-primary">
                                THANK YOU FOR YOUR ORDER
                            </h3>

                            <p className="text-s text-gray-500">
                                Please check your inbox, as a confirmation email
                                is on its way.
                            </p>

                            <div className="mt-6 flex flex-col gap-y-3">
                                <h3 className="w-5 font-gotham !text-gray-500 text-opacity-5">
                                    ORDER REFERENCE:
                                    
                                </h3>
                                <span className='flex flex-row gap-x-5 items-center'>
                                    <h3 className=" font-gotham !text-gray-500 text-opacity-5">
                                    ORDER STATUS:

                                    
                                </h3>  

                                <p className='text-base self-end'>
                                Received
                                    </p>
                                </span>
                              
                            </div>
                        </div>

                        <div className="mt-3 flex  flex-col flex-nowrap gap-y-4 bg-white p-6 pt-12 ">
                            <p className="text-sm font-light hover:underline cursor-pointer">
                                Cancel this order
                            </p>
                            <p className="text-sm font-light hover:underline cursor-pointer">
                                My Account
                            </p>
                            <p className="text-sm font-light hover:underline cursor-pointer">
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

                        <button className=' text-white w-10/12 self-center !bg-primary py-3 mt-8 font-gotham tracking-wider hover:!bg-black transition-all'>
                            CONTINUE SHOPPING
                        </button>
                    </div>
                    <div className="right flex-[0.6]">
                        <div className="top flex w-full flex-col items-center gap-y-5 bg-blue-100 pt-8 p-7">
                            <h3 className='font-gotham text-lg'>HAVE YOUR SAY</h3>
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
                                <div className="flex h-12 w-12  items-center justify-center rounded-full bg-violet-500 p-1 hover:bg-opacity-70 cursor-pointer transition-all">
                                    <img
                                        src={instagram_icon}
                                        alt="snapchat icon"
                                        className="h-[80%] w-[80%]"
                                    />
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3b5998] p-2 hover:bg-opacity-70 cursor-pointer transition-all">
                                    <img
                                        src={facebook_icon}
                                        alt="snapchat icon"
                                        className="h-[80%] w-[80%]"
                                    />
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFFC00] hover:bg-opacity-70 cursor-pointer transition-all">
                                    <img
                                        src={snapchat_icon}
                                        alt="snapchat icon"
                                        className="h-[80%] w-[80%]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bottom mt-4 w-full h-[340px] relative ">
                            <img
                                src={image}
                                alt=""
                                className="object-cover w-full h-full object-bottom mix-blend-darken bg-black blur-[0.5px]"
                            />

                            <div className='absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] w-full p-6 mx-auto text-center '>
                                <h3 className='text-white font-gotham text-5xl order-shadow leading-[1.2]'>
                                    Looking for more ?
                                </h3>

                                <p className='text-white font-gotham mt-7 text-lg leading-6 order-shadow'>
                                    Discover over 700 vintage boutiques and independent brands on out sister site,
                                    GLAMO Marketplace
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <footer className='sticky bottom-0 left-0 w-full basis-full bg-white mt-auto py-5 flex justify-center items-center'>
                GLAMO Help
            </footer>
        </section>
    );
}

export default Order_Success;
