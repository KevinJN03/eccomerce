import { useState } from 'react';
import OrderItem from './orderItem';
import secure_icon from '../../../assets/icons/secure-document.png';
import { ClickAwayListener } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
function Containers({}) {
    const onClickAway = () => {
        if (check) {
            console.log('clickaway');
            setTimeout(() => {
                setCheck(() => false);
            }, 1000);
        }
    };
    return (
        <section className="w-full p-5">
            <OrderItem />

            <div className="daisy-drawer daisy-drawer-end z-30">
                <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="daisy-drawer-toggle"
                />
                <div className="daisy-drawer-content">
                    {/* Page content here */}
                </div>
                <div className="daisy-drawer-side z-30">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="close sidebar"
                        className="daisy-drawer-overlay"
                    ></label>
                    <div className="daisy-menu min-h-full w-6/12 bg-base-200 p-4 text-base-content">
                        <header className="flex flex-row justify-between">
                            <div className="left">
                                <h3 className="text-xl font-semibold ">
                                    Order from Maria Holmes
                                </h3>
                                <p className="underline ring-offset-1">
                                    #1234567
                                </p>
                                <p>1 item, £29.74</p>
                            </div>
                            <div className="right">
                                <p className="text-sm font-semibold">
                                    Pre-transit
                                </p>
                                <p>
                                    Ordered 01:45, Wed, 08 Nov, 2023
                                    <p>Deliver to PALESTINE, IL</p>
                                </p>
                            </div>
                        </header>

                        <div className="flex flex-row gap-5">
                            <span className="flex flex-row flex-nowrap items-center gap-3">
                                <CheckRoundedIcon />
                                <p className="text-lg font-semibold">
                                    Completed
                                </p>
                            </span>

                            <button
                                type="button"
                                className="hover:shadow-3xl rounded-full border-2 border-black px-4 py-3 font-semibold transition-all hover:scale-x-105"
                            >
                                More actions
                                <ArrowDropDownSharpIcon />
                            </button>
                        </div>

                        <div className="my-3 flex flex-row gap-3 rounded-sm border-[1px] border-dark-gray p-4">
                            <div className="h-fit w-fit rounded-full bg-dark-gray/50 p-2">
                                <PersonOutlineTwoToneIcon />
                            </div>
                            <div>
                                <div className="flex flex-row items-center gap-3">
                                    <button className="flex flex-row items-center">
                                        <p className="underline underline-offset-1">
                                            Tamara Venatta
                                        </p>
                                        <ArrowDropDownSharpIcon />
                                    </button>{' '}
                                    <p className="underline underline-offset-1">
                                        userid123456789
                                    </p>
                                </div>

                                <p className="underline underline-offset-1 hover:no-underline">
                                    Order history
                                </p>
                            </div>
                        </div>

                        <div className="my-3 flex flex-row justify-between gap-3 rounded-sm border-[1px] border-dark-gray p-4">
                            <div className="left flex items-center gap-3">
                                <img
                                    src={secure_icon}
                                    alt="secure document icon"
                                    className="h-6 w-6"
                                />
                                <p>Only you can see this note</p>
                            </div>
                            <button className="flex flex-nowrap items-center gap-1 rounded border-[1px] border-dark-gray/60 px-2 py-2 hover:bg-light-grey/100">
                                <AddRoundedIcon className="!text-sm" />
                                <p className="text-xs">Add a private note</p>
                            </button>
                        </div>

                        <div className="mb-3">
                            <p className="text-sm font-semibold">Pre-transit</p>
                            <p className="text-xs">
                                Estimated delivery: 27 Dec-18 Jan
                            </p>
                        </div>

                        <section className="flex flex-row justify-between border-[1px] border-dark-gray p-4">
                            <div className="left flex-[1]">
                                <p className="text-xs text-gray-700/70">
                                    Deliver to
                                </p>
                                <p className="font-medium">Tamara Venatta</p>

                                <p>303 e market st</p>

                                <p>PALESTINE, IL 62451</p>
   
                                <p>United States</p>
                            </div>
                            <div className="right flex-[3] flex flex-col gap-1">
                                <p className="text-xs text-gray-700/70">
                                    Selected by buyer
                                </p>
                                <p className="font-medium w-full justify-between flex">
                                    Standard Delivery <span>£4.99</span>
                                </p>
                                <div className='flex flex-row gap-3'>
                                    <img
                                        src="https://i.etsystatic.com/28351927/r/il/5cf205/4297201722/il_75x75.4297201722_tole.jpg" className='w-10 h-10 rounded-md'
                                        alt=""
                                    />
                                    <p>
                                        Warm Dog Harness Lead Set Soft
                                        Adjustable Fleece Pet Puppy Vest with
                                        Fur Collar
                                    </p>
                                    <p className='flex flex-nowrap gap-2'>Qty <span>1</span></p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Containers;
