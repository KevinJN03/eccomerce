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
import dayjs from 'dayjs'
function OrderCancel({  order }) {
  const totalItems = order?.items.reduce(
    (Accum, currentValue) => Accum + currentValue?.quantity,
    0,
  );
  const orderDate = dayjs(order?.createdAt).format('dddd DD MMMM YYYY');
  return (
    <Html>
      <Head>
        <EmailHead />
      </Head>
      <EmailTailwind>
        <Body>
          <Container align="center" className="bg-[#eeeeee] w-[600px]">
            <Section>
              <Header />
              <Row>
                <Column align="center" className="py-6">
                  <Img
                    src={
                      'https://aws-glamo-upload-bucket.s3.eu-west-2.amazonaws.com/files/logos/icons8-box-64.png'
                    }
                    className="w-8 h-8"
                  />
                  <Text className="font-bold text-lg">
                    YOUR ORDER HAS BEEN CANCELLED
                  </Text>
                  <Text className="w-5/6 text-center">
                    Hi {order?.customer?.firstName},
                    we’ve cancelled the order below as requested and you haven’t
                    been charged. All done!
                  </Text>

                  <Text className="p-0 m-0">Order No.: {order?._id}</Text>
                  <Text className="p-0 m-0">Order Date: {orderDate}</Text>
                </Column>
              </Row>
              <Section className="px-5 pt-0">
                <Row className="p-4 bg-white">
                  <Column className="bg-white">
                    <Text className="font-semibold tracking-wider text-base pt-0 mt-0">
                      {totalItems} {totalItems == 1 ? 'ITEM' : 'ITEMS'}
                    </Text>
                    <Hr className="p-0 m-0" />
                  </Column>
                </Row>
                <Row className="bg-white " align="center">
                  <Column className="px-4 pb-0 bg-white" align="center">
                    <Section className="bg-white">
                      {order?.items?.map((itemProps, idx) => {
                        console.log({ itemProps });
                        return <Item {...itemProps} key={idx} />;
                      })}
                    </Section>
                    <Hr className="bg-white box-border m-0 pb-2" />
                  </Column>
                </Row>
                <Row>
                  <Column className="">
                    <TotalContainer
                      deliveryCost={'3.99'}
                      total={'10.00'}
                      subtotal={'6.01'}
                    />
                  </Column>
                </Row>
              </Section>
              <Container className="box-border p-5 pb-2 min-w-full">
                <Row className="bg-white min-w-full">
                  <Column className="bg-white p-4 pt-0  min-w-full">
                    <Text className="font-semibold text-lg">
                      REFUND DETAILS
                    </Text>
                    <Hr />
                    <Text className="text-[13px] leading-4">
                      If any payment was taken, these funds should appear on
                      your bank statement within 5-10 working days (Please note
                      that refund times are dictated by the card issuers and are
                      outside our control). If a discount was applied on your
                      original order, the amount refunded will be adjusted to
                      allow for the revised order value and appropriate discount
                      level. If you used a Gift Voucher on your order, you’ll be
                      issued with a new voucher which will be locked to your
                      account.
                    </Text>
                  </Column>
                </Row>
              </Container>

              <Thanks />
              <MoreQuestions />
              <Footer />
            </Section>
          </Container>
        </Body>
      </EmailTailwind>
    </Html>
  );
}

export default OrderCancel;
