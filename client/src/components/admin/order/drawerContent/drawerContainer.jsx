import secure_icon from '../../../../assets/icons/secure-document.png';

import { useAdminContext } from '../../../../context/adminContext';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import countryLookup from 'country-code-lookup';
// import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { useState } from 'react';
import dayjs from 'dayjs';
import AddressContainer from './addressContainer';
import Receipt from './reciept';
import {
    CloseSharp,
    PersonOutlineTwoTone,
    AddRounded,
    ArrowDropDownSharp,
    CheckRounded,
} from '@mui/icons-material';
function DrawerContainer() {
    const { orderInfo, setOpenDrawer } = useAdminOrderContext();
    console.log({ orderInfo });

    const [country, setCountry] = useState(
        () =>
            countryLookup.byIso(orderInfo.shipping_address.address?.country)
                ?.country
    );
    return (
        <div className=" flex w-full flex-row gap-1">
            <div
                onClick={() => setOpenDrawer(false)}
                className="h-fit w-fit cursor-pointer rounded-md border-2  border-white bg-transparent p-2"
            >
                <CloseSharp className="!fill-primary/80" />
            </div>
            <div className="!h-full w-full !bg-white p-8">
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
                        <CheckRounded />
                        <p className="text-lg font-semibold">Completed</p>
                    </span>

                    <button
                        type="button"
                        className="rounded-full border-2 border-black px-4 py-3 font-semibold transition-all hover:scale-x-105 hover:shadow-3xl"
                    >
                        More actions
                        <ArrowDropDownSharp />
                    </button>
                </div>

                <div className="my-3 flex flex-row gap-3 rounded-sm border-[1px] border-dark-gray p-4">
                    <div className="h-fit w-fit rounded-full bg-dark-gray/50 p-2">
                        <PersonOutlineTwoTone />
                    </div>
                    <div>
                        <div className="flex flex-row items-center gap-3">
                            <button className="flex flex-row items-center">
                                <p className="underline underline-offset-1">
                                    {orderInfo.shipping_address?.name}
                                </p>
                                <ArrowDropDownSharp />
                            </button>{' '}
                            <p className="underline underline-offset-1 text-xxs align-baseline">
                                {orderInfo.customer?._id}
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
                        <AddRounded className="!text-sm" />
                        <p className="text-xs">Add a private note</p>
                    </button>
                </div>

                <div className="mb-3">
                    <p className="text-sm font-semibold">Pre-transit</p>
                    <p className="text-xs">Estimated delivery: 27 Dec-18 Jan</p>
                </div>
                <AddressContainer country={country} />
                <Receipt />
            </div>
        </div>
    );
}

export default DrawerContainer;
