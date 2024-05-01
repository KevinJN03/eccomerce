import * as React from 'react';
import {
  Head,
  Tailwind,
  Html,
  Body,
  Text,
  Img,
  Section,
  Row,
  Column,
  Hr,
  Button,
  Container,
} from '@react-email/components';
import Header from '../components/header.jsx';
import EmailHead from '../components/emailHead.jsx';
import EmailTailwind from '../components/emailTailwind.jsx';
import dayjs from 'dayjs';
import Item from '../components/item.jsx';
import Thanks from '../components/thanks.jsx';
import Footer from '../components/footer.jsx';
import MoreQuestions from '../components/morequestions.jsx';
import _ from 'lodash';
function OrderShipped({ order, preview }) {
  const orderDate = dayjs(order?.createdAt).format('dddd DD MMMM YYYY');

  const courierLinks = {
    'royal mail':
      'https://www.royalmail.com/track-your-item#/tracking-results/',
    ups: 'https://www.ups.com/track?track=yes&trackNums=',
    fedex:
      'https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber=',
    dhl: 'https://www.dhl.com/en/express/tracking.html?AWB=',
    hermes: 'https://www.evri.com/track/parcel/',
    'parcelforce worldwide':
      'https://www.parcelforce.com/track-trace?trackNumber=',
    yodel: 'https://www.yodel.co.uk/track/?parcelNumber=',
    tnt: 'https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber=',
  };

  const isMonthDifferent =
    dayjs(_.get(order, 'shipped.min_delivery_date')).diff(
      dayjs(_.get(order, 'shipped.max_delivery_date')),
      'month',
    ) >= 1;

  let estimated_delivery = '';

  if (
    dayjs(_.get(order, 'shipped.min_delivery_date')).diff(
      _.get(order, 'shipped.max_delivery_date'),
      'day',
    ) <= 1
  ) {
    estimated_delivery = `${dayjs(
      _.get(order, 'shipped.max_delivery_date'),
    ).format('dddd DD MMMM, YYYY')}`;
  } else if (isMonthDifferent) {
    estimated_delivery = `${dayjs(
      _.get(order, 'shipped.min_delivery_date'),
    ).format('ddd DD MMMM')} - ${dayjs(
      _.get(order, 'shipped.max_delivery_date'),
    ).format('ddd DD MMMM, YYYY')}}`;
  } else {
    estimated_delivery = `${dayjs(
      _.get(order, 'shipped.min_delivery_date'),
    ).format('ddd DD')} - ${dayjs(
      _.get(order, 'shipped.max_delivery_date'),
    ).format('ddd DD MMMM, YYYY')}}`;
  }

  const trackingLink = `${
    courierLinks[_.get(order, 'shipped.courier')?.toLowerCase()] ||
    'https://parcelsapp.com/en/tracking/'
  }${_.get(order, 'shipped.tracking_number')}`;

  const deliveryMethods = Array.from(
    new Set(
      order?.itemsByProfile.map(({ shippingInfo }) => {
        return _.get(shippingInfo, 'shipping.service');
      }),
    ),
  );

  const TrackButton = () => {
    return (
      <Container className="mt-3 w-full text-center mx-auto">
        <Button
          href={trackingLink}
          className="tracking-wider text-center  bg-[#2d2d2d] font-semibold px-16 cursor-pointer"
        >
          <Text className="text-white text-sm ">TRACK PARCEL</Text>
        </Button>
      </Container>
    );
  };
  return (
    <Html lang="en" align="center">
      <EmailHead />
      <EmailTailwind>
        <Body align="center" className="!text-center w-full">
          <Container
            align="center"
            className={`${
              preview ? 'min-w-full' : 'max-w-[37.5rem]'
            } !bg-light-grey `}
          >
            <Section className="w-full" align="center">
              <Header />

              <Row className="w-full box-border  !min-w-full">
                <Column
                  className="text-center p-4 w-full min-w-full"
                  align="center"
                >
                  <Img
                    src={
                      'https://aws-glamo-upload-bucket.s3.eu-west-2.amazonaws.com/files/logos/icons8-box-64.png'
                    }
                    className="w-8 h-8 mx-auto"
                  />
                  <Text className="font-bold">WE’VE SENT IT!</Text>
                  <Text>
                    Hi {_.get(order, 'customer.firstName') || ''}, your parcel
                    is on its way and it should be with you soon!
                  </Text>
                  <Text className="p-0 m-0">Order No.: {order?._id}</Text>

                  <Text className="p-0 m-0">Order date: {orderDate}</Text>
                  <Text className="p-0 m-0 text-green-700">
                    Estimated delivery date: {estimated_delivery}
                  </Text>

                  <TrackButton />
                </Column>
              </Row>

              <Row className=" !bg-light-grey min-w-full mb-4">
                <Column
                  align="center"
                  className="!bg-light-grey min-w-full "
                  style={{
                    padding: '0 20px',
                  }}
                >
                  <Container
                    className={`min-w-full ${
                      preview ? '!border-[1.25rem] !border-white' : '!p-5'
                    } !m-0 !bg-white`}
                  >
                    <Text className="m-0 p-0 font-semibold tracking-wide text-base border-b-8 border-white">
                      DELIVERY DETAILS
                    </Text>
                    <Hr />{' '}
                    <Text className="m-0 p-0 py-2 font-semibold text-gray-500 tracking-wide text-base">
                      {' '}
                      DELIVERY ADDRESS
                    </Text>
                    <Container className="p-0 m-0">
                      <Text className="p-0 m-0">
                        {order?.shipping_address?.name}
                      </Text>

                      <Text className="p-0 m-0">
                        {order?.shipping_address?.address?.line1}
                      </Text>

                      {order?.shipping_address?.address?.line2 && (
                        <Text className="p-0 m-0">
                          {order?.shipping_address?.address?.line2}
                        </Text>
                      )}

                      <Text className="p-0 m-0">
                        {`${order?.shipping_address?.address?.postal_code} ${order?.shipping_address?.address?.state}, ${order?.shipping_address?.address?.country}`}
                      </Text>

                      <Text className="p-0 m-0">
                        {order?.shipping_address?.phone}
                      </Text>
                    </Container>
                    {deliveryMethods.length >= 0 && (
                      <>
                        <Text className="m-0 p-0 py-2 font-semibold text-gray-500 tracking-wide text-base">
                          {deliveryMethods?.length > 1
                            ? 'DELIVERY METHODS'
                            : 'DELIVERY METHOD'}
                        </Text>
                        <Text className="p-0 m-0 ">
                          {deliveryMethods.join(', ')}
                        </Text>
                      </>
                    )}
                  </Container>
                </Column>
              </Row>

              <Row className=" !bg-light-grey w-full m-0">
                <Column
                  id="test-colum"
                  align="center"
                  className="!bg-light-grey  !mx-auto "
                  style={{
                    padding: '0 20px',
                  }}
                >
                  <Container
                    className={`bg-white min-w-full p-5 ${
                      preview ? 'border-[1.25rem]  !border-white' : ''
                    }`}
                  >
                    <Text className="font-semibold text-base m-0 p-0 border-white border-b-8">
                      {`${order?.items?.length} ${
                        order?.items?.length > 1 ? 'ITEMS' : 'ITEM'
                      } SENT`}
                    </Text>
                    <Hr />{' '}
                    <Text className="border-y-8 border-white m-0 text-green-700">
                      Estimated delivery date:{' '}
                      {/* {order?.shipping_option?.delivery_date} */}
                      {estimated_delivery}
                    </Text>
                    {/* {deliveryMethods.length >= 0 && (
                      <Text className="p-0 m-0 text-green-700">
                        {deliveryMethods.length <= 1
                          ? 'Delivery method'
                          : 'Delivery methods'}
                        : {deliveryMethods.join(', ')}
                      </Text>
                    )} */}
                    <Hr />{' '}
                    <Row className="bg-white " align="center">
                      <Column className="pt-3 pb-0 bg-white" align="center">
                        <Section className="bg-white">
                          {order?.items?.map((itemProps, idx) => {
                            return <Item {...itemProps} key={idx} />;
                          })}
                        </Section>
                        <Hr /> <TrackButton />
                      </Column>
                    </Row>
                  </Container>
                </Column>
              </Row>
              <Row className="w-full">
                <Column
                  align="center"
                  className="w-full !mx-auto !px-5 !max-w-[37.5rem] "
                >
                  {_.get(order, 'shipped.note') && (
                    <Container
                      className={` bg-light-grey text-center w-full`}
                      align="center"
                    >
                      <Text className="!mb-0 !pb-0">
                        <span className="font-semibold">Note from Glamo</span>{' '}
                      </Text>
                      <Text className="!my-0 !py-0 text-black/70  !break-all w-full">
                        {_.get(order, 'shipped.note')}
                      </Text>
                    </Container>
                  )}
                  <Thanks />
                </Column>
              </Row>
              <Row>
                <Column
                  align="center"
                  className="!min-w-full w-full bg-[#dedfe4]"
                >
                  <MoreQuestions preview={preview} />
                </Column>
              </Row>
              <Row>
                <Column
                  align="center"
                  className="!mx-auto !min-w-full w-full bg-[#333333]"
                >
                  <Footer />
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </EmailTailwind>
    </Html>
  );
}

export default OrderShipped;
