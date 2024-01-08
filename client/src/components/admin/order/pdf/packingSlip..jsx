import { useEffect, useState } from 'react';
import glamo_icon from '../../../../assets/icons/glamo-black-logo.svg';
import { adminAxios } from '../../../../api/axios';
import countryLookup from 'country-code-lookup';
import dayjs from 'dayjs';
import paperPlane_icon from '../../../../assets/icons/paper-plane.png';
const WEBSITE_URL = import.meta.env?.VITE_WEBSITE_URL;

function GenerateAddress({ name, address }) {
    return (
        <p>
            {name} <br />
            {address?.line1} <br />
            {address?.line2 && (
                <>
                    {address?.line2}
                    <br />
                </>
            )}
            {`${address?.city}, ${address?.postal_code}`} <br />
            {countryLookup.byIso(address?.country)?.country}
        </p>
    );
}
function PackingSlip({}) {
    const [order, setOrder] = useState({});

    const [fromAddress, setFromAddress] = useState({
        name: 'Kevin Jean',
        address: {
            line1: 'Flat 8',
            line2: '848 Queens Road',
            city: 'KINGSTON UPON THAMES',
            country: 'GB',
            postal_code: 'KT65 9XD',
        },
    });

    useEffect(() => {
        adminAxios
            .get(`order/DFI4DI7Q7CC5`)
            .then(({ data }) => {
                setOrder(() => data?.order);
            })
            .catch((error) => {
                console.error('error at pdf:', error);
            });
    }, []);
    return (
        <section className="min-h-screen w-[800px] p-4">
            {order?._id && (
                <>
                    <header className="flex h-32 w-full items-center justify-center">
                        <img
                            src={glamo_icon}
                            alt="glamo icon"
                            className="object-fit h-20"
                        />
                    </header>

                    <section>
                        <p className="text-xl font-semibold">glamo</p>
                        <p className="mt-1">{WEBSITE_URL}</p>
                    </section>

                    <section className="mt-12 flex w-full flex-row flex-nowrap gap-6">
                        <div className="left w-full flex-1">
                            <p className="font-semibold">Deliver to</p>
                            <GenerateAddress
                                name={order.shipping_address?.name}
                                address={order.shipping_address?.address}
                            />

                            <section className="border-b-2 border-black pb-4">
                                <p className="mt-3 text-xs font-semibold">
                                    Scheduled to dispatch by
                                </p>

                                <p>
                                    {dayjs(
                                        order.shipping_option?.delivery_date
                                    ).format('DD MMM, YYYY')}
                                </p>
                            </section>

                            <section className="from-address">
                                <p className="mt-3 text-xs font-semibold">
                                    From
                                </p>
                                <GenerateAddress
                                    name={fromAddress.name}
                                    address={fromAddress.address}
                                />
                            </section>
                            <section className="order-information mt-3 flex flex-col gap-3">
                                <section>
                                    <p className=" text-xs font-semibold">
                                        Order
                                    </p>
                                    <p className="text-xs">#{order?._id}</p>
                                </section>

                                <p className=" text-xs font-semibold">
                                    Order date <br />
                                    <span className="font-normal ">
                                        {dayjs(order?.createdAt).format(
                                            'DD MMM, YYYY'
                                        )}
                                    </span>
                                </p>

                                <p className=" text-xs">
                                    <span className="font-semibold">
                                        {' '}
                                        Buyer
                                    </span>
                                    <br />
                                    {order?.customer?.fullName} <br />
                                    <span className="text-xxs font-semibold">
                                        ({order.customer?._id})
                                    </span>
                                </p>

                                <p className="">
                                    <span className="font-semibold">
                                        Payment method
                                    </span>
                                    <br />
                                    Paid via {order?.payment_type}
                                </p>

                                {order.status == 'shipped' && (
                                    <p>
                                        <span className="font-semibold">
                                            Tracking
                                        </span>
                                        <br />
                                        <span>
                                            {order?.trackingNumber ||
                                                'no-tracking'}
                                        </span>

                                        <br />
                                        <span className="font-semibold">
                                            via {order?.courier}
                                        </span>
                                    </p>
                                )}
                            </section>
                        </div>
                        <div className="right w-full flex-[4]">
                            {/* <p className="mb-2 font-semibold">
                                {`${order?.items.length} ${
                                    order?.items.length > 1 ? 'items' : 'item'
                                }`}
                            </p> */}

                            <section className="flex flex-col">
                                <table className="w-full text-xs leading-6">
                                    <thead>
                                        <tr className="leading-2 border-b-[2px] border-black">
                                            <th>
                                                <p className="mb-2 font-semibold">
                                                    {`${order?.items.length} ${
                                                        order?.items.length > 1
                                                            ? 'items'
                                                            : 'item'
                                                    }`}
                                                </p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map((item) => {
                                            return (
                                                <tr className="w-full border-b-2 border-black !p-4">
                                                    <td className="w-14 py-4">
                                                        <img
                                                            src={
                                                                item.product
                                                                    ?.images[0]
                                                            }
                                                            className="h-14 w-full object-cover"
                                                        />
                                                    </td>
                                                    <td className="py-4 pl-4 pr-24 align-top">
                                                        <p className="font-semibold">
                                                            {
                                                                item.product
                                                                    ?.title
                                                            }
                                                        </p>

                                                        {item?.variation1
                                                            ?.variation && (
                                                            <p>
                                                                {
                                                                    item
                                                                        ?.variation1
                                                                        ?.title
                                                                }{' '}
                                                                {' : '}{' '}
                                                                {
                                                                    item
                                                                        ?.variation1
                                                                        ?.variation
                                                                }
                                                            </p>
                                                        )}
                                                        {item?.variation2
                                                            ?.variation && (
                                                            <p>
                                                                {
                                                                    item
                                                                        ?.variation2
                                                                        ?.title
                                                                }{' '}
                                                                {' : '}{' '}
                                                                {
                                                                    item
                                                                        ?.variation2
                                                                        ?.variation
                                                                }
                                                            </p>
                                                        )}
                                                    </td>
                                                    <td className="py-4 text-right align-top">
                                                        <p className="whitespace-nowrap text-xs font-medium">
                                                            {`${
                                                                item?.quantity
                                                            } x £${item?.price?.toFixed(
                                                                2
                                                            )}`}
                                                        </p>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div className="mt-4 flex w-5/12 flex-col gap-2 self-end">
                                    <p className="flex w-full justify-between">
                                        item total{' '}
                                        <span>
                                            £
                                            {order.items
                                                ?.reduce(
                                                    (total, currentItem) =>
                                                        (total +=
                                                            currentItem?.price),
                                                    0
                                                )
                                                ?.toFixed(2)}
                                        </span>
                                    </p>
                                    <p className="flex w-full justify-between">
                                        Subtotal{' '}
                                        <span>
                                            £
                                            {order.transaction_cost?.subtotal?.toFixed(
                                                2
                                            )}
                                        </span>
                                    </p>
                                    <p className="flex w-full justify-between">
                                        Delivery total{' '}
                                        <span>
                                            £
                                            {order.shipping_option?.cost?.toFixed(
                                                2
                                            )}
                                        </span>
                                    </p>
                                    <p className="flex w-full justify-between">
                                        <span className="font-semibold">
                                            Order total
                                        </span>
                                        <span>
                                            £
                                            {order.transaction_cost?.total?.toFixed(
                                                2
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </section>
                        </div>
                    </section>
                </>
            )}

            <footer className="flex-no-wrap sticky bottom-0 mt-5 flex flex-row items-center border-t-2 border-black py-3">
                <div className="left">
                    <img
                        src={glamo_icon}
                        className="h-8 w-auto object-cover"
                        alt="glamo icon"
                    />
                </div>
                <div className="middle pl-16 flex  gap-4">
                    <img
                        src={paperPlane_icon}
                        alt="paper plane icon"
                        className="h-10 w-10"
                    />
                    <section className='text-xxs w-64'>
                        <p className='text-xxs font-semibold w-full'>Do the green thing</p>
                        <p className='text-xxs '>
                            Reuse this paper to make origami, confetti or your
                            next to-do list.
                        </p>
                    </section>
                </div>
            </footer>
        </section>
    );
}

export default PackingSlip;
