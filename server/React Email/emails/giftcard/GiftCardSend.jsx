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
function GiftCardSend({ amount, code, end_date }) {
  const images = {
    default: '360_F_903936095_fCncFarCupSKjJIlXN6mZLvCvaUEbS9K.jpg',
    1: `present-8440034_1280.jpg`,
    2: `360_F_925544819_OVZCpa821uSy58dvZWAYGpH6GqeuSGlg.jpg`,
  };
  return (
    <Html lang="en">
      <EmailHead />
      <EmailTailwind>
        <Body className="mx-auto max-w-full w-[37.5rem]">
          <Container
            className="bg-light-grey !max-w-full !w-[37.5rem] "
            align="center"
          >
            <Section className="max-w-full" align="center">
              <Row className="">
                <Header />
              </Row>
            </Section>
            <Section className="w-full">
              <Row className="w-full">
                <Column align="center" className="min-w-full p-5">
                  <Container className="bg-white p-4 ">
                    <Img
                      className=" object-cover object-center h-72 w-full"
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
                        <Text className="font-bold text-2xl mb-0">
                          {parseFloat(amount).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'GBP',
                          })}
                        </Text>
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
            </Section>
            <Section className="w-full">
              <Row align="center" className="">
                <Column align="center" className="">
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
            </Section>

            <Section className="">
              <Row className="">
                <Column className=" bg-[#dedfe4] px-8 py-4 " align="center">
                  <Text
                    style={{ border: '2px solid black' }}
                    className="w-fit font-semibold py-2 px-6"
                  >
                    Claim Code: {code}
                  </Text>
                  {end_date && (
                    <Text>
                      Expires:{' '}
                      <span>{dayjs.unix(end_date).format('DD MMM YYYY')}</span>
                    </Text>
                  )}

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
            </Section>
            <Section className="min-w-full !m-0 !p-0">
              <Row className="w-full  !m-0 !p-0">
                <Column className="w-full  !m-0 !p-0">
                <Container className='!min-w-full !w-full'>
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

export default GiftCardSend;
