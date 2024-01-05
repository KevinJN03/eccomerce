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
import PrivateNote from './privateNote';
import UserInfo from './userInfo';
function DrawerContainer() {
    const { orderInfo, setOpenDrawer } = useAdminOrderContext();
    console.log({ orderInfo });

    const [country, setCountry] = useState(
        () =>
            countryLookup.byIso(orderInfo.shipping_address.address?.country)
                ?.country
    );
    return (
        <div className=" relative flex w-full flex-row gap-1 ">
            <div className="relative h-fit w-12 bg-transparent">
                <div
                    onClick={() => setOpenDrawer(false)}
                    className="flex cursor-pointer items-center justify-center  rounded-md border-2 border-white p-2 fixed top-2"
                >
                    <CloseSharp className="!fill-primary/80" />
                </div>
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

               <UserInfo/>

                <PrivateNote />

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
