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
function ReturnOrder({ order }) {
  const orderDate = dayjs(order?.createdAt).format('dddd DD MMMM YYYY');
  const totalItems = order?.items.reduce(
    (Accum, currentValue) => Accum + currentValue?.quantity,
    0,
  );
  return (
    <Html>
      <EmailHead />
      <EmailTailwind>
        <Body>
          <Container
            className="!bg-light-grey w-full max-w-[600px]"
            align="center"
          >
            <Section>
              <Row>
                <Header />
              </Row>

              <Row>
                <Column
                  className="text-center p-4 pb-0 w-full min-w-full"
                  align="center"
                >
                  <Img
                    src={
                      'https://aws-glamo-upload-bucket.s3.eu-west-2.amazonaws.com/files/logos/return-box-icon.png'
                    }
                    className="w-8 h-8 mx-auto"
                  />

                  <Text className="!font-semibold text-lg p-0 py-2 m-0">
                    REFUND SENT
                  </Text>

                  <Text className="p-0 m-0 pb-1">
                    Hi {order?.customer?.firstName}, we can confirm that we've
                    received your returned item(s) and sent a refund.
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
                <Column className="p-5 w-full !max-w-full">
                  <Container className="p-4 py-6 bg-white w-full !max-w-full">
                    <Text className="leading-4 !font-medium pb-4 m-0">
                      The below item(s) will be refunded to your original
                      payment method.*
                    </Text>
                    <Text className="p-0 m-0 !font-medium">
                      For original payment with card or bank transfer, the
                      refund should appear on your bank statement within 5-10
                      working days. Please note that refund times are dictated
                      by the card issuers and are outside our control.
                    </Text>

                    <Text className="p-0 py-2 m-0 !font-medium">
                      Items returned after the 28-day returns window (and within
                      45 days) are refunded with an GLAMO returns voucher. This
                      voucher has been added to your account and is ready for
                      you to use. This 28-day window starts after your order is
                      delivered.
                    </Text>

                    <Text className="underline underline-offset-2 m-0  font-medium">
                      Learn More - GLAMO Returns Policy.
                    </Text>
                  </Container>
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
                        return <Item {...itemProps} key={idx} />;
                      })}
                    </Section>
                    <Hr className="bg-white box-border m-0 pb-2" />
                  </Column>
                </Row>
                <Row>
                  <Column className="bg-white p-5 pt-0">
                    <TotalContainer order={order} />
                  </Column>
                </Row>
              </Section>

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

export default ReturnOrder;
