import * as React from 'react';
import { useEffect, Fragment } from 'react';
import { v4 as uuid } from 'uuid';
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
  Font,
} from '@react-email/components';
import TotalContainer from '../components/totalContainer.jsx';
import Item from '../components/item.jsx';
import Thanks from '../components/thanks.jsx';
import Footer from '../components/footer.jsx';
import MoreQuestions from '../components/morequestions.jsx';
import EmailHead from '../components/emailHead.jsx';
import EmailTailwind from '../components/emailTailwind.jsx';
import Header from '../components/header.jsx';
import dayjs from 'dayjs';
import 'dotenv/config';
const clientUrl = process.env.CLIENT_URL;

function OrderReceived({ order }) {
  const orderDate = dayjs(order?.createdAt).format('dddd DD MMMM YYYY');

  const url = 'https://dknhps0hwilzj.cloudfront.net/files/logos';

  const logos = {
    afterpay: 'afterpay.png',
    amex: 'american-express.png',
    klarna: 'klarna.png',
    maestro: 'maestro.png',
    mastercard: 'mastercard-alt.png',
    paypal: 'paypal.png',
    'union-pay': 'union-pay.png',
    visa: 'visa.png',
  };
  return (
    <Html>
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
                  className="text-center p-4 pb-0 w-full min-w-full"
                  align="center"
                >
                  <Img
                    src={
                      'https://aws-glamo-upload-bucket.s3.eu-west-2.amazonaws.com/files/logos/icons8-box-64.png'
                    }
                    className="w-8 h-8 mx-auto"
                  />
                  <Text className="font-semibold text-lg p-0 py-2 m-0">
                    IT’S ORDERED!
                  </Text>
                  <Text className="p-0 m-0 pb-1">
                    Hi {order?.customer?.firstName}, your order has been
                    received.
                  </Text>
                  <Text className="p-0 m-0 h-fit leading-6">
                    Order No.: {order?._id}
                  </Text>

                  <Text className="p-0 m-0 leading-4">
                    Order date: {orderDate}
                  </Text>
                </Column>
              </Row>

              <Row>
                <Column className="p-5 w-full">
                  <Container className="test bg-white p-4 py-5 w-full min-w-full">
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
                </Column>
              </Row>

              <Row>
                <Column className="p-5 pt-0 w-full">
                  <Container className="test bg-white p-4 py-5 w-full min-w-full">
                    <Text className="font-semibold text-base m-0 p-0">
                      YOUR ORDER
                    </Text>
                    <Hr />
                    <Text className="p-0 m-0 text-green-700">
                      Estimated delivery date:{' '}
                      {order?.shipping_option?.delivery_date}
                    </Text>
                    <Text className="m-0 p-0 pb-3">
                      Delivery Method: {order?.shipping_option?.name}
                    </Text>
                    <Section className="bg-white">
                      {order?.items?.map((itemProps, idx) => {
                        return <Item {...itemProps} key={idx} />;
                      })}
                    </Section>

                    <Hr />
                    {/* <Row className="w-full p-0 m-0"> */}
                    <TotalContainer order={order} />
                    {/* </Row> */}
                  </Container>
                </Column>
              </Row>

              <Row>
                <Column className="p-5 pt-0 w-full">
                  <Section className="bg-white p-4 py-5 w-full ">
                    <Row>
                      <Text className="font-semibold text-base pb-1 m-0 !important">
                        PAYMENT DETAILS
                      </Text>
                    </Row>
                    <Hr />
                    <Row>
                      <Text className="m-0 p-0 font-bold text-dark-gray tracking-wider ">
                        PAYMENT TYPE
                      </Text>
                    </Row>
                    <Row className="mt-2 ">
                      <Column
                        id="payment"
                        className="w-12 border-2 h-8  border-black"
                      >
                        <Img
                          src={`${url}/${
                            logos?.[order?.payment_type?.toLowerCase()] || 'credit-card-icon.png'
                          }`}
                          alt="logo"
                          title="logo"
                          className="w-full bg-light-grey rounded-sm block h-full object-contain"
                        />
                      </Column>
                      <Column className="pl-4 text-sm">
                        {order?.payment_type?.[0]?.toUpperCase() +
                          order?.payment_type?.substring(1)}
                      </Column>
                    </Row>
                  </Section>
                </Column>
              </Row>

              <Row>
                <Column className="p-5 py-0 !bg-light-grey w-full">
                  <Section className=" p-4 py-5 bg-white w-full">
                    <Text className="font-semibold text-base p-0 pb-1 m-0">
                      CHANGED YOUR MIND?
                    </Text>

                    <Hr />

                    <Text className="text-dark-gray font-semibold tracking-wider">
                      CANCELLING AN ORDER
                    </Text>

                    <Text className="text-sm">
                      We’re not able to make changes to your order, but you do
                      have the option to cancel it. Find out more. Go to your
                      order from the button below and follow the instructions.
                    </Text>
                    <Container
                      className="align-middle px-auto text-center"
                      align="center"
                    >
                      <Button
                        href={`${clientUrl}/order-success?order-number=${order?._id}`}
                        target="_blank"
                        className="block text-center self-center no-underline mx-auto text-inherit font-semibold w-2/4 py-3 text-sm border-2 border-solid border-light-grey tracking-wider"
                      >
                        VIEW ORDER
                      </Button>
                    </Container>

                    <Text className="text-dark-gray font-semibold tracking-wider ">
                      RETURNING AN ORDER
                    </Text>

                    <Text className="text-sm">
                      You also have the option to return any unwanted items by
                      Monday 15 January 2024*. However, for hygiene reasons
                      there are some items that we can’t accept back and these
                      will be sent back to you.
                    </Text>

                    <Container
                      className="align-middle px-auto text-center"
                      align="center"
                    >
                      <Button
                        href={`${clientUrl}/return-information`}
                        target="_blank"
                        className="block text-center self-center no-underline mx-auto text-inherit font-semibold w-2/4 py-3 text-sm border-2 border-solid border-light-grey tracking-wider"
                      >
                        RETURN INFORMATION
                      </Button>
                    </Container>
                  </Section>
                </Column>
              </Row>

              <Row>
                <Column className="w-full">
                  <Container className="w-full">
                    <Thanks />
                    <MoreQuestions />
                    <Footer />
                  </Container>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </EmailTailwind>
    </Html>
  );
}

export default OrderReceived;
