import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import dayjs from 'dayjs';
import SingleItem from './singleItem';
import { useAdminOrderContext } from '../../../context/adminOrder';
import countryLookup from 'country-code-lookup';
import { useRef, useState } from 'react';
import { adminAxios } from '../../../api/axios';
import userLogout from '../../../hooks/userLogout';

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
        console.log({ addressText, addressHtml });

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
            setOrderInfo(() => data?.order);
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
            className={`${
                lastOrderInArray ? '' : 'border-b-2'
            } flex w-full cursor-pointer flex-row  px-5 py-6 ${
                isOrderInSet
                    ? 'bg-green-400/20 hover:bg-green-400/30'
                    : '  hover:bg-light-grey/30'
            }`}
        >
            <div className="left ml-5 flex flex-[2] flex-row gap-5">
                <div className='w-5 h-5'>
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
               
                <div className="flex-col">
                    <p className="flex flex-row items-center gap-1">
                        <span className="underline underline-offset-1">
                            {order.shipping_address?.name}
                        </span>{' '}
                        <ArrowDropDownSharpIcon />
                    </p>
                    <p>
                        <span className="underline underline-offset-1">
                            #{order?._id}
                        </span>
                        <span className="ml-3">
                            £
                            {parseFloat(order.transaction_cost?.total).toFixed(
                                2
                            )}
                        </span>
                    </p>

                    <div className="flex flex-col">
                        {order.items?.map((itemObj, idx) => {
                            return <SingleItem itemObj={itemObj} key={idx} />;
                        })}
                    </div>
                </div>
            </div>
            <div className="right flex flex-1 flex-row">
                <div className="left flex-[5]">
                    <p className="text-sm font-medium">
                        {['received', 'processing'].includes(order?.status)
                            ? `Ship by ${dayjs(
                                  order.shipping_option?.delivery_date
                              ).format('MMM DD, YYYY')}`
                            : 'Ordered'}
                    </p>
                    <p>
                        Ordered{' '}
                        {dayjs(order?.createdAt)?.format('DD MMM, YYYY')}
                    </p>
                    <p className="my-3">
                        {['received', 'processing'].includes(order?.status)
                            ? `${
                                  order.shipping_option?.name
                              } (£${order.shipping_option?.cost?.toFixed(2)})`
                            : ''}
                    </p>
                    {/* <div className="my-3 rounded-sm border-[1px] border-gray-400 bg-light-grey p-3">
                                    <p className="text-xxs underline underline-offset-1">
                                        4206245192748903396184000008292471
                                    </p>
                                    <p className="text-xxs font-semibold">
                                        Dispatched on 22 Dec
                                    </p>
                                  
                                </div> */}

                    <div>
                        <button
                            onClick={() =>
                                setShowFullAddress((prevState) => !prevState)
                            }
                            id="deliver-to"
                            className="disable-drawer w-fit text-s active:border-2 active:border-light-grey"
                        >
                            Deliver To{' '}
                            <ExpandMoreRoundedIcon className="disable-drawer !text-lg" />
                        </button>
                        <p className="text-xs font-semibold">
                            {order.shipping_address?.name}
                        </p>
                        {!showFullAddress && (
                            <p>
                                {order.shipping_address.address?.city},{' '}
                                {
                                    countryLookup.byIso(
                                        order.shipping_address.address?.country
                                    )?.country
                                }
                            </p>
                        )}
                        {showFullAddress && (
                            <div>
                                {' '}
                                <p ref={addressRef}>
                                    {address?.line1}
                                    <br />

                                    {address?.line2 || ''}

                                    {address?.line2 && <br />}
                                    {`${address?.city}, ${address?.state} ${address?.postal_code}`}
                                    <br />
                                    {
                                        countryLookup.byIso(address?.country)
                                            ?.country
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
                <div className="right flex-1 p-2"></div>
            </div>
        </section>
    );
}

export default OrderItem;
