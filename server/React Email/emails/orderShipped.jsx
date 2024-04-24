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
function OrderShipped({ order }) {
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
  return (
    <Html lang="en">
      <EmailHead />
      <EmailTailwind>
        <Body>
          <Container
            className="!bg-light-grey w-full max-w-[600px]"
            align="center"
          >
            <Section className="w-full" align="center">
              <Row>
                <Header />
              </Row>

              <Row className="w-full box-border !max-w-[600px] !min-w-full">
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
                    Hi {order?.customer?.firstName}, your parcel is on its way
                    and it should be with you soon!
                  </Text>
                  <Text className="p-0 m-0">Order No.: {order?._id}</Text>

                  <Text className="p-0 m-0">Order date: {orderDate}</Text>
                  <Text className="p-0 m-0 text-green-700">
                    Estimated delivery date: {estimated_delivery}
                  </Text>
                  <Container align="center" className="mt-3">
                    <Button
                      href={trackingLink}
                      className="tracking-wider  bg-[#2d2d2d] font-semibold px-16 cursor-pointer"
                    >
                      <Text className="text-white text-sm ">TRACK PARCEL</Text>
                    </Button>
                  </Container>
                </Column>
              </Row>

              <Row className=" !bg-light-grey w-full !max-w-[600px] !min-w-full mb-4">
                {/* <Container className="p-4 !bg-light-grey"> */}
                <td
                  className="!bg-light-grey w-full text-left "
                  style={{
                    padding: '0 20px',
                  }}
                >
                  <Container className=" !bg-white w-full !p-5">
                    <Text className="m-0 p-0 font-semibold tracking-wide text-base">
                      DELIVERY DETAILS
                    </Text>
                    <Hr />
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
                  </Container>
                </td>
              </Row>

              <Row className=" !bg-light-grey w-full max-w-[600px] m-0">
                {/* <Container className="p-4 !bg-light-grey w-full"> */}
                {/* <Column className="px-5 pb-0 w-full min-w-full"> */}

                <td
                  className="!bg-light-grey w-full text-left "
                  style={{
                    padding: '0 20px',
                  }}
                >
                <Container className="bg-white p-4 min-w-full">
                  <Text className="font-semibold text-base m-0 p-0">
                    {`${order?.items?.length} ${
                      order?.items?.length > 1 ? 'ITEMS' : 'ITEM'
                    } SENT`}
                  </Text>
                  <Hr />
                  <Text className="p-0 m-0 text-green-700">
                    Estimated delivery date:{' '}
                    {/* {order?.shipping_option?.delivery_date} */}
                    {estimated_delivery}
                  </Text>
                  {deliveryMethods.length >= 0 && (
                    <Text className="p-0 m-0 text-green-700">
                      {deliveryMethods.length <= 1
                        ? 'Delivery method'
                        : 'Delivery methods'}
                      : {deliveryMethods.join(', ')}
                    </Text>
                  )}
                  <Hr />{' '}
                  <Row className="bg-white " align="center">
                    <Column className="pt-3 pb-0 bg-white" align="center">
                      <Section className="bg-white">
                        {order?.items?.map((itemProps, idx) => {
                          return <Item {...itemProps} key={idx} />;
                        })}
                      </Section>
                      <Hr />{' '}
                      <Container className="my-3 mx-auto w-full text-center">
                        <Button
                          href={trackingLink}
                          className="tracking-wider  bg-[#2d2d2d] font-semibold px-16 cursor-pointer  text-center"
                        >
                          <Text className="text-white text-sm ">
                            TRACK PARCEL
                          </Text>
                        </Button>
                      </Container>
                      {/* <Container
                          className="pt-2 mx text-center"
                          align="center"
                        >
                          <Button
                            href={trackingLink}
                            className="tracking-wider py-3 bg-[#2d2d2d] text-sm font-semibold px-16 text-white cursor-pointer"
                          >
                            TRACK PARCEL
                          </Button>
                        </Container> */}
                    </Column>
                  </Row>
                </Container>

                </td>
                {/* </Column> */}
              </Row>
              <Row>
                <Container>
                  <Thanks />
                </Container>
              </Row>
              <Row>
                {' '}
                  <MoreQuestions />
              </Row>
              <Row>
                <Container>
                  <Footer />
                </Container>
              </Row>
            </Section>
          </Container>
        </Body>
      </EmailTailwind>
    </Html>
  );
}

export default OrderShipped;
