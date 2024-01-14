import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import dayjs from 'dayjs';
import SingleItem from './singleItem';
import { useAdminOrderContext } from '../../../context/adminOrder';
import countryLookup from 'country-code-lookup';
import { useRef, useState } from 'react';
import { adminAxios } from '../../../api/axios';
import userLogout from '../../../hooks/userLogout';
import secure_icon from '../../../assets/icons/secure-document.png';

function OrderItem({ order, date, lastOrderInArray, disableCheckBox }) {
    const { setOpenDrawer, setOrderInfo, selectionSet, setSelectionSet } =
        useAdminOrderContext();
    const [showFullAddress, setShowFullAddress] = useState(false);
    const [copyAddress, setCopyAddress] = useState(false);
    const [address, setAddress] = useState(
        order?.shipping_address?.address || {}
    );
    const addressRef = useRef(null);

    const { logoutUser } = userLogout();
    const handleCopy = () => {
        const addressHtml = addressRef.current?.innerHTML;

        const addressText = addressHtml.replaceAll('<br>', ' ');

        navigator.clipboard.writeText(addressText);
        setCopyAddress(true);
    };

    const isOrderInSet = selectionSet?.has(order?._id);

    const toggleSelection = () => {
        setSelectionSet((prevSet) => {
            const newSet = new Set(prevSet);
            if (prevSet?.has(order?._id)) {
                newSet.delete(order._id);
            } else {
                newSet.add(order?._id);
            }
            return newSet;
        });
    };

    const handleClick = async (e) => {
        let success = false;
        try {
            if (e.target.classList?.contains('disable-drawer')) {
                return;
            }
            const { data } = await adminAxios.get(`order/${order?._id}`);
            console.log({ data }, 'here');
            setOrderInfo(() => ({...data?.order}));
            success = true;
        } catch (error) {
            logoutUser({ error });
            console.error('errow while fetching order', error);
        } finally {
            if (success) {
                setOpenDrawer(true);
            }
        }
    };

    return (
        <section
            // htmlFor="my-drawer-4"
            onClick={handleClick}
            className={`flex flex-row gap-3 ${
                lastOrderInArray ? '' : 'border-b-2'
            } flex w-full cursor-pointer flex-row  px-5 py-6 ${
                isOrderInSet
                    ? 'bg-green-100/60 hover:bg-green-400/30'
                    : '  hover:bg-light-grey/30'
            }`}
        >
            <div className="left ml-5 flex flex-[2] flex-row gap-5">
                <div className="h-5 w-5">
                    {!disableCheckBox && (
                        <input
                            checked={isOrderInSet}
                            onChange={toggleSelection}
                            type="checkbox"
                            id=""
                            className="disable-drawer  daisy-checkbox daisy-checkbox-sm !z-50 mt-2 rounded-sm"
                        />
                    )}
                </div>
            </div>

            <section className="middle flex w-full flex-col gap-3 ">
                <section className="flex w-full flex-row">
                    <div className="w-full flex-[3] flex-col">
                        <p className="flex flex-row items-center gap-1 ">
                            <span className="underline underline-offset-1">
                                {order.shipping_address?.name}
                            </span>{' '}
                            <ArrowDropDownSharpIcon />
                        </p>
                        <p>
                            <span className="underline underline-offset-1 text-xxs">
                                #{order?._id}
                            </span>
                            <span className="ml-2 text-xxs">
                                £
                                {parseFloat(
                                    order.transaction_cost?.total
                                ).toFixed(2)}
                            </span>
                        </p>

                        <div className="flex flex-col ">
                            {order.items?.map((itemObj, idx) => {
                                return (
                                    <SingleItem itemObj={itemObj} key={idx} />
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col">
                        <p className="text-xs font-medium">
                            {['received', 'processing'].includes(order?.status)
                                ? `Ship by ${dayjs(
                                      order.shipping_option?.delivery_date
                                  ).format('MMM DD, YYYY')}`
                                : 'Ordered'}
                        </p>
                        <p className='text-xxs'>
                            Ordered{' '}
                            {dayjs(order?.createdAt)?.format('DD MMM, YYYY')}
                        </p>
                        <p className="my-3 text-xxs">
                            {['received', 'processing'].includes(order?.status)
                                ? `${
                                      order.shipping_option?.name
                                  } (£${order.shipping_option?.cost?.toFixed(
                                      2
                                  )})`
                                : ''}
                        </p>

                        <div className="relative flex flex-col ">
                            <button
                                onClick={() =>
                                    setShowFullAddress(
                                        (prevState) => !prevState
                                    )
                                }
                                id="deliver-to"
                                className="disable-drawer relative left-[-6px] flex h-5 w-fit flex-row flex-nowrap items-center gap-[2px] border-2 border-transparent pl-1   focus:border-light-grey active:border-light-grey"
                            >
                                <p className="disable-drawer text-xxs text-black/85 underline-offset-1 hover:underline">
                                    Deliver To
                                </p>
                                <ExpandMoreRoundedIcon
                                    className={`disable-drawer !fill-black/85 !text-s ${
                                        showFullAddress
                                            ? 'rotate-180'
                                            : 'rotate-0'
                                    }`}
                                />
                            </button>
                            <p className="text-xxs font-semibold">
                                {order.shipping_address?.name}
                            </p>
                            {!showFullAddress && (
                                <p className='text-xxs'>
                                    {order.shipping_address.address?.city},{' '}
                                    {
                                        countryLookup.byIso(
                                            order.shipping_address.address
                                                ?.country
                                        )?.country
                                    }
                                </p>
                            )}
                            {showFullAddress && (
                                <div>
                                    {' '}
                                    <p className='text-xxs' ref={addressRef}>
                                        {address?.line1}
                                        <br />

                                        {address?.line2 || ''}

                                        {address?.line2 && <br />}
                                        {`${address?.city}, ${address?.state} ${address?.postal_code}`}
                                        <br />
                                        {
                                            countryLookup.byIso(
                                                address?.country
                                            )?.country
                                        }
                                    </p>
                                    <span
                                        className="tooltip tooltip-top"
                                        data-tooltip={
                                            copyAddress
                                                ? 'Copied'
                                                : 'Click to copy to clipboard'
                                        }
                                    >
                                        <button
                                            id="copy-address"
                                            onMouseLeave={() => {
                                                if (copyAddress) {
                                                    setCopyAddress(false);
                                                    return;
                                                }

                                                return;
                                            }}
                                            onClick={handleCopy}
                                            className="disable-drawer text-xs text-primary/70 underline underline-offset-1"
                                        >
                                            {' '}
                                            Copy address
                                        </button>
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {order.private_note?.length >= 1 && (
                    <div className="private-note flex flex-row gap-2 rounded-sm border px-4 py-3">
                        <span className="">
                            <img
                                src={secure_icon}
                                alt="secure file icon"
                                className="h-5 w-6 object-contain"
                            />
                        </span>
                        <div className="flex w-full flex-col gap-2">
                            {order.private_note?.map((item, idx) => {
                                return (
                                    <p 
                                        className={`pb-2 ${
                                            (idx == order.private_note?.length - 1)
                                                ? ''
                                                : 'border-b'
                                        } w-full`}
                                    >
                                        {item?.note}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                )}
            </section>
            <div className="right flex flex-1  flex-row p-5"></div>
        </section>
    );
}

export default OrderItem;
