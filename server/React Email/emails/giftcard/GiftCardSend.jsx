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
  Font,
  Heading,
  Link,
} from '@react-email/components';
import TotalContainer from '../../components/totalContainer.jsx';
import Item from '../../components/item.jsx';
import Thanks from '../../components/thanks.jsx';
import Footer from '../../components/footer.jsx';
import MoreQuestions from '../../components/morequestions.jsx';
import EmailHead from '../../components/emailHead.jsx';
import EmailTailwind from '../../components/emailTailwind.jsx';
import Header from '../../components/header.jsx';
import dayjs from 'dayjs';
import 'dotenv/config';
import _ from 'lodash';
const { WEBSITE_URL, CLOUDFRONT_URL } = process.env;
function GiftCardSend({
  name,
  amount,
  code,

  companyName,
  companyAddress,
  companyPhone,
}) {
  const images = {
    default: '360_F_903936095_fCncFarCupSKjJIlXN6mZLvCvaUEbS9K.jpg',
    1: `present-8440034_1280.jpg`,
    2: `360_F_925544819_OVZCpa821uSy58dvZWAYGpH6GqeuSGlg.jpg`,
  };
  return (
    <Html lang="en">
      <EmailHead />
      <EmailTailwind>
        <Body>
          <Container className="bg-light-grey w-[600px]" align="center">
            <Section className="" align="center">
              <Row>
                <Header />
              </Row>
              <Row>
                <Column className="p-10 " align="center">
                  {' '}
                  <Container className="bg-white p-4 ">
                    <Img
                      className=" !max-w-[32rem] object-cover object-center h-72 w-full"
                      src={`${CLOUDFRONT_URL}/files/gift+card/${images['default']}`}
                    />
                    <Text className="p-4 text-xl">
                      It’s your lucky day! A special Glamo gift card has been
                      sent your way, and we can’t wait for you to discover
                      what’s in store.
                    </Text>
                    <Hr />
                    <Row>
                      <Column className="px-4">
                        <Text className="font-bold text-2xl mb-0">£50.00</Text>
                        <Text className="mt-0 text-black/60">
                          Glamo gift card
                        </Text>
                      </Column>
                      <Column className="w-24 h-24">
                        <Img
                          className="w-24 h-24 object-cover"
                          src={`${CLOUDFRONT_URL}/files/logos/glamo-black-logo.png`}
                        ></Img>
                      </Column>
                    </Row>
                  </Container>
                </Column>
              </Row>

              <Row align="center">
                <Column align="center">
                  <Button
                    href={WEBSITE_URL}
                    target="_blank"
                    className="cursor-pointer no-underline font-semibold py-3 text-base !bg-[#2d2d2d] px-3 text-white tracking-wider"
                  >
                    Apply to your Glamo Account
                  </Button>

                  <Text className="text-sm text-black/60 mt-5">
                    Don't have a glamo account? <br />{' '}
                    <span>
                      <Link
                        className="underline"
                        href={`${WEBSITE_URL}/${'portal/signup'}`}
                      >
                        Sign up
                      </Link>{' '}
                      to redeem
                    </span>
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column
                  className=" bg-[#dedfe4] px-8 py-4 !w-full"
                  align="center"
                >
                  <Text
                    style={{ border: '2px solid black' }}
                    className="w-fit font-semibold py-2 px-6"
                  >
                    Claim Code: 1234-56789-01234
                  </Text>

                  <Text className="text-left">
                    To use your gift card, first add items to your cart and
                    proceed to checkout. On the payment page, you’ll find an
                    option to enter a gift card code. Simply input your unique
                    code and apply it to see your balance deducted from the
                    total amount.
                  </Text>
                  <Text className="text-left">
                    To add the gift card to your account for future use, visit{' '}
                    {WEBSITE_URL}/my-account/gift-cards-and-vouchers and enter
                    your code there. If you need assistance, please contact our
                    support team at {`support@${WEBSITE_URL.slice(4)}`} or visit
                    our{' '}
                    <Link className="underline" href={`${WEBSITE_URL}/help`}>
                      Help Center
                    </Link>
                    . Happy shopping!
                  </Text>
                </Column>
              </Row>
              <Row>
                <Thanks />
                <MoreQuestions />
                <Footer />
              </Row>
            </Section>
          </Container>
        </Body>
      </EmailTailwind>
    </Html>
  );
}

export default GiftCardSend;
