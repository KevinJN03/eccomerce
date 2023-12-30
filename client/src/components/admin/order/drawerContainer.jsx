import secure_icon from '../../../assets/icons/secure-document.png';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useAdminContext } from '../../../context/adminContext';
import { useAdminOrderContext } from '../../../context/adminOrder';
import countryLookup from 'country-code-lookup';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { useState } from 'react';
import dayjs from 'dayjs';
function DrawerContainer() {
    const { orderInfo, setOpenDrawer } = useAdminOrderContext();
    console.log({ orderInfo });

    const [country, setCountry] = useState(
        () =>
            countryLookup.byIso(orderInfo.shipping_address.address?.country)
                ?.country
    );
    return (
        <div className="relative box-border flex h-full w-full max-w-[750px] flex-row gap-1">
            <div
                onClick={() => setOpenDrawer(false)}
                className="cursor-pointer h-fit w-fit rounded-md border-2 border-white bg-transparent p-2"
            >
                <CloseSharpIcon className='!fill-primary/80'/>
            </div>
            <div className="h-full w-full !bg-white p-8">
                <header className="flex flex-row justify-between">
                    <div className="left">
                        <h3 className="text-xl font-semibold ">
                            Order from {orderInfo.shipping_address?.name}
                        </h3>
                        <p className="underline ring-offset-1">
                            #{orderInfo?._id}
                        </p>
                        <p>
                            {orderInfo?.items?.length} item, £
                            {parseFloat(
                                orderInfo.transaction_cost?.total
                            )?.toFixed(2)}
                        </p>
                    </div>
                    <div className="right">
                        <p className="text-sm font-semibold">Pre-transit</p>
                        <p>
                            {`Ordered ${dayjs(orderInfo?.createdAt).format(
                                'HH:mm, ddd, DD MMM, YYYY'
                            )}`}
                            <p>
                                Deliver to{' '}
                                {`${orderInfo.shipping_address.address?.city}, ${country}`}
                            </p>
                        </p>
                    </div>
                </header>

                <div className="flex flex-row gap-5">
                    <span className="flex flex-row flex-nowrap items-center gap-3">
                        <CheckRoundedIcon />
                        <p className="text-lg font-semibold">Completed</p>
                    </span>

                    <button
                        type="button"
                        className="rounded-full border-2 border-black px-4 py-3 font-semibold transition-all hover:scale-x-105 hover:shadow-3xl"
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
                                    {orderInfo.shipping_address?.name}
                                </p>
                                <ArrowDropDownSharpIcon />
                            </button>{' '}
                            <p className="underline underline-offset-1">
                                {orderInfo?.customer}
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
                    <p className="text-xs">Estimated delivery: 27 Dec-18 Jan</p>
                </div>

                <section className="flex flex-row justify-between gap-10 border-[1px] border-dark-gray p-4">
                    <div className="left flex-[1]">
                        <p className="text-xs text-gray-700/70">Deliver to</p>
                        <p className="font-medium">
                            {orderInfo.shipping_address?.name}
                        </p>

                        <p>{orderInfo.shipping_address?.address?.line1}</p>

                        <p>{`${orderInfo.shipping_address?.address?.city}, ${orderInfo.shipping_address?.address?.state}`}</p>
                        <p>
                            {orderInfo.shipping_address?.address?.postal_code}
                        </p>

                        <p>{country}</p>
                    </div>
                    <div className="right flex flex-[3] flex-col gap-1">
                        <p className="text-xs text-gray-700/70">
                            Selected by buyer
                        </p>
                        <p className="flex w-full justify-between font-medium">
                            Standard Delivery <span>£4.99</span>
                        </p>
                        <div className="flex flex-row gap-3">
                            <img
                                src="https://i.etsystatic.com/28351927/r/il/5cf205/4297201722/il_75x75.4297201722_tole.jpg"
                                className="h-10 w-10 rounded-md"
                                alt=""
                            />
                            <p>
                                Warm Dog Harness Lead Set Soft Adjustable Fleece
                                Pet Puppy Vest with Fur Collar
                            </p>
                            <p className="flex flex-nowrap gap-2">
                                Qty <span>1</span>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default DrawerContainer;
