import React, { useState } from 'react';
import GenerateAddress from './generateAddress.jsx';
import dayjs from 'dayjs';
import _ from 'lodash';
import { Text, View, Image, renderToStream } from '@react-pdf/renderer';
function OrderInformation({ order, feature, checks }) {
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
    <View
      id="order-information"
      style={{
        marginTop: '40pt',
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
          <Text style={{ fontWeight: 'semibold' }}>Deliver to</Text>
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
            {dayjs(_.get(order, 'shipped.delivery_date')).format(
              'DD MMM, YYYY',
            )}
          </Text>
        </View>

        {checks?.dispatch_from && (
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
            <Text style={{ fontWeight: 'semibold' }}>Order</Text>
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
          <Text style={{ fontWeight: 'semibold' }}>Order date</Text>
          <Text className="font-normal ">
            {dayjs(order?.createdAt).format('DD MMM, YYYY')}
          </Text>
        </View>

        {feature?.buyer && (
          <View>
            <Text style={{ fontWeight: 'semibold' }}>Buyer</Text>
            <Text>{order?.customer?.fullName}</Text>
            <Text style={{ fontWeight: 'semibold' }}>
              {`(${order.customer?._id})`}
            </Text>
          </View>
        )}

        <View>
          <Text style={{ fontWeight: 'semibold' }}>Payment method</Text>
          <Text>Paid via {order?.payment_type || order?.paymentType}</Text>
        </View>

        {order?.status == 'shipped' && (
          <View>
            <Text style={{ fontWeight: 'semibold' }}>Tracking</Text>

            <Text>{order?.trackingNumber || 'no-tracking'}</Text>

            <Text style={{ fontWeight: 'semibold' }}>via {order?.courier}</Text>
          </View>
        )}
      </View>

      <View
        id="right"
        style={{
          flex: '4',

          // padding: '10pt',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {!_.isEmpty(checks.note?.text) && (
          <View style={{ marginBottom: '8pt' }}>
            <Text style={{ fontWeight: 'semibold' }}>A note from the shop</Text>
            <Text style={{ width: '100%', whiteSpace: 'normal' }}>
              {`${checks.note.text}`}
            </Text>
          </View>
        )}

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
                  paddingVertical: '16pt',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {checks?.listing_photos && (
                  <View
                    style={{
                      height: '40pt',
                      width: '40pt',
                      boxSizing: 'border-box',
                      marginRight: '27pt',
                      // marginRight: '16pt'
                    }}
                  >
                    <Image
                      src={item.product?.images[0]}
                      style={{
                        height: '40pt',
                        width: '40pt',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  </View>
                )}
                <View
                  style={{
                    paddingRight: '60pt',
                    verticalAlign: 'top',
                    boxSizing: 'border-box',
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
                      {`${item?.variation1?.title} : ${item?.variation1?.variation}`}
                    </Text>
                  )}
                  {item?.variation2?.variation && (
                    <Text>
                      {`${item?.variation2?.title} : ${item?.variation2?.variation}`}
                    </Text>
                  )}
                </View>

                <Text
                  style={{
                    textAlign: 'right',
                    width: '100%',
                  }}
                >
                  {`${item?.quantity} x £${item?.price?.toFixed(2)}`}
                </Text>
              </View>
            );
          })}
        </View>

        {checks?.cost_breakdown && (
          <View
            id="footer"
            className=""
            style={{
              marginVertical: '16pt',
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
              <Text
              // className="flex w-full justify-between"
              // style={{
              //     display: 'flex',
              //     justifyContent: 'space-between',
              //     flexWrap: 'nowrap',
              // }}
              >
                item total
              </Text>
              <Text style={{ textAlign: 'right' }}>
                £
                {order.items
                  ?.reduce(
                    (total, currentItem) => (total += currentItem?.price),
                    0,
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
              <Text>£{order.shipping_option?.cost?.toFixed(2)}</Text>
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
              <Text>£{order.transaction_cost?.total?.toFixed(2)}</Text>
            </View>
          </View>
        )}

        {checks?.note_from_buyer && (
          <View style={{}}>
            <Text style={{ fontWeight: 'semibold' }}>Note from buyer</Text>
            <Text>{checks?.note_from_buyer}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default OrderInformation;
