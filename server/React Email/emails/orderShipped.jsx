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
                    Estimated delivery date:{' '}
                    {order?.shipping_option?.delivery_date}
                  </Text>
                  <Container align="center" className="pt-3">
                    <Button
                      href={`${courierLinks[order?.courier?.toLowerCase()]}${
                        order?.trackingNumber
                      }`}
                      className="tracking-wider py-3 bg-[#2d2d2d] font-semibold px-16 text-white text-sm cursor-pointer"
                    >
                      TRACK PARCEL
                    </Button>
                  </Container>
                </Column>
              </Row>

              <Row className=" !bg-light-grey w-full !max-w-[600px] !min-w-full p-0">
                {/* <Container className="p-4 !bg-light-grey"> */}
                <Column className="!bg-light-grey p-5 w-full min-w-full">
                  <Container className="test bg-white p-4 w-full min-w-full">
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
                    <Text className="m-0 p-0 py-2 font-semibold text-gray-500 tracking-wide text-base">
                      DELIVERY METHOD
                    </Text>

                    <Text className="p-0 m-0">
                      {order?.shipping_option?.name}
                    </Text>
                  </Container>
                </Column>
                {/* </Container> */}
              </Row>

              <Row className=" !bg-light-grey w-full max-w-[600px] m-0">
                {/* <Container className="p-4 !bg-light-grey w-full"> */}
                <Column className="px-5 pb-0 w-full min-w-full">
                  <Container className="bg-white p-4 min-w-full">
                    <Text className="font-semibold text-base m-0 p-0">
                      {`${order?.items?.length} ${
                        order?.items?.length > 1 ? 'ITEMS' : 'ITEM'
                      } SENT`}
                    </Text>
                    <Hr />
                    <Text className="p-0 m-0 text-green-700">
                      Estimated delivery date:{' '}
                      {order?.shipping_option?.delivery_date}
                    </Text>
                    <Hr />{' '}
                    <Row className="bg-white " align="center">
                      <Column className="pt-3 pb-0 bg-white" align="center">
                        <Section className="bg-white">
                          {order?.items?.map((itemProps, idx) => {
                            return <Item {...itemProps} key={idx} />;
                          })}
                        </Section>
                        <Hr />{' '}
                        <Container
                          className="pt-2 mx text-center"
                          align="center"
                        >
                          <Button
                            href={`${
                              courierLinks[order?.courier?.toLowerCase()] ||
                              'https://parcelsapp.com/en/tracking/'
                            }${order?.trackingNumber}`}
                            className="tracking-wider py-3 bg-[#2d2d2d] text-sm font-semibold px-16 text-white cursor-pointer"
                          >
                            TRACK PARCEL
                          </Button>
                        </Container>
                      </Column>
                    </Row>
                  </Container>
                </Column>
              </Row>
              <Row>
                <Container>
                  <Thanks />
                </Container>
              </Row>
              <Row>
                {' '}
                <Container>
                  <MoreQuestions />
                </Container>
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
