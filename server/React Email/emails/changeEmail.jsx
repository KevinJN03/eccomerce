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
  Preview,
} from '@react-email/components';
import Header from '../components/header.jsx';
import EmailHead from '../components/emailHead.jsx';
import EmailTailwind from '../components/emailTailwind.jsx';
import Thanks from '../components/thanks.jsx';
import Footer from '../components/footer.jsx';
const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL;
function ChangeEmail({ firstName, newEmail }) {
  return (
    <Html>
      <EmailHead />
      <EmailTailwind>
        {!newEmail ? (
          <Preview>
            This is where you’ll get emails from us now. Your email address has
            been updated Hey there {firstName}, you’ve updated your email
            address so now we’ll keep you posted.
          </Preview>
        ) : (
          <Preview>
            We’ll send emails to your new account now. Your email address has
            been updated Hey there {firstName}, you’ve updated your email
            address to
            {newEmail}. That me
          </Preview>
        )}
        <Body>
          <Container
            className="!bg-light-grey w-full"
            align="center"
          >
            <Section align="center">
              <Row>
                <Header />
              </Row>

              <Row className="!p-0 !m-0">
                <Column
                  className="p-5 w-full !max-w-full text-center box-border !m-0"
                  align="center"
                >
                  <Img
                    src={`${CLOUDFRONT_URL}/files/logos/icons8-person-96.png`}
                    className="bg-transparent w-9 h-9 text-center mx-auto object-cover"
                  />
                  <Text className="font-semibold text-base tracking-wider pb-0 mb-1">
                    YOUR EMAIL ADDRESS HAS BEEN UPDATED
                  </Text>
                  {!newEmail ? (
                    <Text className="p-0 m-0">
                      Hey there {firstName}, you’ve updated your email address
                      so now we’ll keep you posted on this account. Check back
                      here for order updates and more.
                    </Text>
                  ) : (
                    <Text className="p-0 m-0">
                      Hey there {firstName}, you’ve updated your email address
                      to{' '}
                      <a className="underline " href={`mailto: ${newEmail}`}>
                        {newEmail}
                      </a>
                      . That means we’ll send emails about order updates and
                      more to that account now, instead of this one. See you on
                      the other side!
                    </Text>
                  )}
                </Column>
              </Row>

              <Row className="!p-0 !m-0">
                <Column className="p-5 !w-full !m-0 ">
                  <Container className="p-5 bg-white !w-full  !max-w-full">
                    <Text className="p-0 m-0 font-semibold text-base">
                      DIDN’T DO THIS?
                    </Text>
                    <Hr />
                    <Text>
                      If you didn’t change your email address or need to get in
                      touch with our Customer Care team, use the link below.
                    </Text>

                    <Container className="w-full !text-center " align="center">
                      <Button className="px-10 py-3 text-sm font-medium text-center text-white bg-[#2d2d2d] ">
                        GET IN TOUCH
                      </Button>
                    </Container>
                  </Container>
                </Column>
              </Row>

              <Row className="w-full !max-w-full !p-0 !m-0">
                <Column className="p-5 pb-1 w-full !m-0">
                  <Container className="p-5 bg-white !max-w-full  !w-full !m-0 ">
                    <Text className="p-0 m-0 font-semibold text-base">
                      KEEPING YOUR ACCOUNT SAFE
                    </Text>
                    <Hr />
                    <Text className="m-0 p-0">
                      At GLAMO, your account security is super important to us.
                      We’ll never ask you to send your password or card details
                      to us by email. If you receive an email claiming to be
                      from GLAMO requesting this information, please don’t
                      reply, but do let us know.
                    </Text>
                  </Container>
                </Column>
              </Row>

              <Row>
                <Column>
                  <Thanks />
                  <Container className="pt-1">
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

export default ChangeEmail;
