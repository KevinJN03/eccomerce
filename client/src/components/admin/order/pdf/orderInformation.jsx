import { useState } from 'react';
import GenerateAddress from './generateAddress';
import dayjs from 'dayjs';
import countryLookup from 'country-code-lookup';
import { Text, View, Image } from '@react-pdf/renderer';
function OrderInformation({ order, feature }) {
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
    return (
        <>
            <View
                id="order-information"
                style={{
                    marginTop: '48pt',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    gap: '20pt',
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            >
                <View
                    id="left"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        flex: '1.2 1 0%',
                    }}
                >
                    <View>
                        <Text style={{ fontWeight: 'semibold' }}>
                            Deliver to
                        </Text>
                        <GenerateAddress
                            name={order.shipping_address?.name}
                            address={order.shipping_address?.address}
                        />
                    </View>

                    <View
                        id="dispatch"
                        style={{
                            paddingBottom: '12pt',
                            borderBottom: '1pt',
                            borderBottomColor: 'black',
                        }}
                    >
                        <Text
                            className={'whitespace-nowrap'}
                            style={{
                                fontWeight: 'semibold',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Scheduled to dispatch by
                        </Text>
                        <Text>
                            {dayjs(order.shipping_option?.delivery_date).format(
                                'DD MMM, YYYY'
                            )}
                        </Text>
                    </View>

                    {feature?.fromAddress && (
                        <View id="from-address">
                            <Text
                                style={{
                                    fontWeight: 'semibold',
                                }}
                            >
                                From
                            </Text>
                            <GenerateAddress
                                name={fromAddress.name}
                                address={fromAddress.address}
                            />
                        </View>
                    )}

                    {feature?.orderNumber && (
                        <View>
                            <Text style={{ fontWeight: 'semibold' }}>
                                Order
                            </Text>
                            <Text>#{order?._id}</Text>
                        </View>
                    )}

                    {feature?.shop && (
                        <View>
                            <Text
                                className=" text-xs font-semibold "
                                style={{ fontWeight: 'semibold' }}
                            >
                                Shop
                            </Text>
                            <Text className="font-normal ">glamo</Text>
                        </View>
                    )}
                    <View>
                        <Text style={{ fontWeight: 'semibold' }}>
                            Order date
                        </Text>
                        <Text className="font-normal ">
                            {dayjs(order?.createdAt).format('DD MMM, YYYY')}
                        </Text>
                    </View>

                    {feature?.buyer && (
                        <View>
                            <Text style={{ fontWeight: 'semibold' }}>
                                Buyer
                            </Text>
                            <Text>{order?.customer?.fullName}</Text>
                            <Text style={{ fontWeight: 'semibold' }}>
                                ({order.customer?._id})
                            </Text>
                        </View>
                    )}

                    <View>
                        <Text style={{ fontWeight: 'semibold' }}>
                            Payment method
                        </Text>
                        <Text>
                            Paid via {order?.payment_type || order?.paymentType}
                        </Text>
                    </View>

                    {order.status == 'shipped' && (
                        <View>
                            <Text style={{ fontWeight: 'semibold' }}>
                                Tracking
                            </Text>

                            <Text>
                                {order?.trackingNumber || 'no-tracking'}
                            </Text>

                            <Text style={{ fontWeight: 'semibold' }}>
                                via {order?.courier}
                            </Text>
                        </View>
                    )}
                </View>
                {/* here the right side */}

                <View
                    id="right"
                    style={{
                        flex: '4',

                        // padding: '10pt',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'semibold',
                            borderBottom: '1pt solid black',
                            paddingBottom: '8pt',
                         
                        }}
                    >
                        {`${order?.items?.length} ${
                            order?.items?.length > 1 ? 'items' : 'item'
                        }`}
                    </Text>
                    <View style={{ width: '100%' }}>
                        {order.items.map((item) => {
                            return (
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'nowrap',
                                        borderBottom: '1pt solid black',
                                        padding: '16pt',
                                        width: '100%',
                                    }}
                                >
                                    <View
                                        style={{
                                            height: '40pt',
                                            width: '40pt',
                                        }}
                                    >
                                        <Image
                                            src={item.product?.images[0]}
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                            }}
                                        />
                                    </View>
                                    <View
                                        className="py-4 pl-4 pr-24 align-top"
                                        style={{
                                            marginLeft: '16pt',
                                            paddingRight: '96pt',
                                            verticalAlign: 'top',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: 'semibold',
                                                width: '80%',
                                            }}
                                        >
                                            {item.product?.title}
                                        </Text>

                                        {item?.variation1?.variation && (
                                            <Text>
                                                {item?.variation1?.title}{' '}
                                                {' : '}{' '}
                                                {item?.variation1?.variation}
                                            </Text>
                                        )}
                                        {item?.variation2?.variation && (
                                            <Text>
                                                {item?.variation2?.title}{' '}
                                                {' : '}{' '}
                                                {item?.variation2?.variation}
                                            </Text>
                                        )}
                                    </View>

                                    <Text
                                        style={{
                                            textAlign: 'right',
                                            width: '100%',
                                        }}
                                    >
                                        {`${
                                            item?.quantity
                                        } x £${item?.price?.toFixed(2)}`}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>

                    <View
                        id="footer"
                        className=""
                        style={{
                            marginTop: '16pt',
                            width: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4pt',
                            alignSelf: 'flex-end',
                        }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'nowrap',
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                            }}
                        >
                            {' '}
                            <Text
                            // className="flex w-full justify-between"
                            // style={{
                            //     display: 'flex',
                            //     justifyContent: 'space-between',
                            //     flexWrap: 'nowrap',
                            // }}
                            >
                                item total{' '}
                            </Text>
                            <Text style={{ textAlign: 'right' }}>
                                £
                                {order.items
                                    ?.reduce(
                                        (total, currentItem) =>
                                            (total += currentItem?.price),
                                        0
                                    )
                                    ?.toFixed(2)}
                            </Text>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'nowrap',
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                            }}
                        >
                            <Text>Subtotal</Text>
                            <Text style={{ textAlign: 'right' }}>
                                £{order.transaction_cost?.subtotal?.toFixed(2)}
                            </Text>
                        </View>

                        <View
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'nowrap',
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                            }}
                        >
                            <Text>Delivery total</Text>
                            <Text>
                                £{order.shipping_option?.cost?.toFixed(2)}
                            </Text>
                        </View>

                        <View
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'nowrap',
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                                fontWeight: 'semibold',
                            }}
                        >
                            <Text>Order total</Text>
                            <Text>
                                £{order.transaction_cost?.total?.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

export default OrderInformation;

/* 

<section className="mt-12 flex w-full flex-row flex-nowrap gap-6">
                <div className="left w-full flex-1">
                    <p className="font-semibold">Deliver to</p>

                    <section className="border-b-2 border-black pb-4">
                        <p className="mt-3 text-xs font-semibold">
                            Scheduled to dispatch by
                        </p>

                        <p>
                            {dayjs(order.shipping_option?.delivery_date).format(
                                'DD MMM, YYYY'
                            )}
                        </p>
                    </section>

                    {feature?.fromAddress && (
                        <section className="from-address">
                            <p className="mt-3 text-xs font-semibold">From</p>
                            <GenerateAddress
                                name={fromAddress.name}
                                address={fromAddress.address}
                            />
                        </section>
                    )}
                    <section className="order-information mt-3 flex flex-col gap-3">
                        {feature?.orderNumber && (
                            <section>
                                <p className=" text-xs font-semibold">Order</p>
                                <p className="text-xs">#{order?._id}</p>
                            </section>
                        )}
                        {feature?.shop && (
                            <p className=" text-xs font-semibold">
                                Shop
                                <span className="font-normal ">glamo</span>
                            </p>
                        )}

                        <p className=" text-xs font-semibold">
                            Order date
                            <span className="font-normal ">
                                {dayjs(order?.createdAt).format('DD MMM, YYYY')}
                            </span>
                        </p>

                        {feature?.buyer && (
                            <p className=" text-xs">
                                <span className="font-semibold"> Buyer</span>

                                {order?.customer?.fullName}
                                <span className="text-xxs font-semibold">
                                    ({order.customer?._id})
                                </span>
                            </p>
                        )}

                        <p className="">
                            <span className="font-semibold">
                                Payment method
                            </span>
                            Paid via {order?.payment_type}
                        </p>

                        {order.status == 'shipped' && (
                            <p>
                                <span className="font-semibold">Tracking</span>

                                <span>
                                    {order?.trackingNumber || 'no-tracking'}
                                </span>

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
                            </p> 

                            <section className="flex flex-col">
                            <table className="w-full text-xs leading-6">
                                <thead>
                                    <tr className="leading-2 border-b-[2px] border-black">
                                        <th>
                                            <p className="mb-2 font-semibold">
                                                {`${order?.items?.length} ${
                                                    order?.items?.length > 1
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
                                                            item.product?.images[0]
                                                        }
                                                        className="h-14 w-full object-cover"
                                                    />
                                                </td>
                                                <td className="py-4 pl-4 pr-24 align-top">
                                                    <p className="font-semibold">
                                                        {item.product?.title}
                                                    </p>
    
                                                    {item?.variation1
                                                        ?.variation && (
                                                        <p>
                                                            {
                                                                item?.variation1
                                                                    ?.title
                                                            }{' '}
                                                            {' : '}{' '}
                                                            {
                                                                item?.variation1
                                                                    ?.variation
                                                            }
                                                        </p>
                                                    )}
                                                    {item?.variation2
                                                        ?.variation && (
                                                        <p>
                                                            {
                                                                item?.variation2
                                                                    ?.title
                                                            }{' '}
                                                            {' : '}{' '}
                                                            {
                                                                item?.variation2
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
                                                    (total += currentItem?.price),
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
                                        £{order.shipping_option?.cost?.toFixed(2)}
                                    </span>
                                </p>
                                <p className="flex w-full justify-between">
                                    <span className="font-semibold">
                                        Order total
                                    </span>
                                    <span>
                                        £{order.transaction_cost?.total?.toFixed(2)}
                                    </span>
                                </p>
                            </div>
                        </section>
                    </div>
                </section>
*/
