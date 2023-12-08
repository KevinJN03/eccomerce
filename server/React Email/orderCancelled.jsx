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
import TotalContainer from './totalContainer.jsx';
import Item from './item.jsx';
import Thanks from './thanks.jsx';
import Footer from './footer.jsx';
import MoreQuestions from './morequestions.jsx';

function OrderCancel({ firstName, orderNumber, orderDate, items }) {


    const totalItems = items.reduce((Accum, currentValue)=> Accum + (currentValue?.quantity), 0)
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Poppins"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://dknhps0hwilzj.cloudfront.net/fonts/Poppins-Regular.ttf',
            format: 'ttf',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Tailwind>
        <Container align="center" className="bg-[#eeeeee] w-[600px]">
          <Section>
            <Row className="bg-[#2d2d2d] py-4" align="center">
              <Column>
                <Img
                  src={
                    'https://aws-glamo-upload-bucket.s3.eu-west-2.amazonaws.com/files/logos/glamo.png'
                  }
                  className="w-32 mx-auto"
                />
              </Column>
            </Row>
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
                <Text>
                  Hi {firstName[0].toUpperCase() + firstName.substring(1)},
                  we’ve cancelled the order below as requested and you haven’t
                  been charged. All done!
                </Text>

                <Text>Order No.: {orderNumber}</Text>
                <Text>Order Date: {orderDate}</Text>
              </Column>
            </Row>
            <Section className="px-5">
              <Row className="p-4 bg-white">
                <Column className="bg-white">
                  <Text className="font-semibold tracking-wider text-base">
                    {totalItems} {totalItems == 1 ? 'ITEM' : 'ITEMS'}
                  </Text>
                  <Hr />
                </Column>
                <Row className="bg-white " align="center">
                  <Column className="p-4 pb-0 bg-white" align="center">
                    <Section className="bg-white">
                      {items.map((itemProps, idx) => {
                       console.log({itemProps})
                        return (<Item {...itemProps} key={idx} />);
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
              </Row>
            </Section>
            <Container className="box-border p-5 pb-2">
              <Row className="bg-white">
                <Column className="bg-white p-4 pt-0">
                  <Text className="font-semibold text-lg">REFUND DETAILS</Text>
                  <Hr />
                  <Text className="text-[13px] leading-4">
                    If any payment was taken, these funds should appear on your
                    bank statement within 5-10 working days (Please note that
                    refund times are dictated by the card issuers and are
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

            <Thanks className={'!p-0'} />
            <MoreQuestions />
            <Footer />
          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
}

export default OrderCancel;
