import * as React from 'react';
import {
  Body,
  Button,
  Column,
  Container,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Section,
  Text,
} from '@react-email/components';
import EmailHead from './emailHead.jsx';
import EmailTailwind from './emailTailwind.jsx';
import Header from './header.jsx';
import 'dotenv/config';
import Thanks from './thanks.jsx';
import Footer from './footer.jsx';

const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL;
function PasswordReset({ url }) {
  return (
    <Html lang="en">
      <EmailHead />
      <EmailTailwind>
        <Body>
          <Container
            className="bg-light-grey w-[600px] max-w-[600px]"
            align="center"
          >
            <Section className="" align="center">
              <Row>
                <Header />
              </Row>
              <Row className="p-5">
                {' '}
                <Column
                  align="center"
                  className="pt-4 bg-transparent box-border"
                >
                  <Img
                    src={`${CLOUDFRONT_URL}/files/logos/lock.png`}
                    className="bg-transparent w-7 h-7"
                  />
                  <Text className="font-semibold text-base tracking-wider pb-0 mb-1">
                    YOUR PASSWORD RESET LINK IS READY
                  </Text>
                  <Text className='p-0 m-0'>
                    Just click the link to reset it - but be quick, it expires
                    in 3 hours
                  </Text>
                </Column>
              </Row>
              <Row className="p-5 pt-0">
                <Column className="bg-white box-border w-full p-4 pt-0">
                  <Text className="font-semibold text-sm tracking-wide mb-2">
                    WANT TO MAKE YOUR NEW PASSWORD STRONG?
                  </Text>
                  <Hr className="m-0 p-0" />
                  <Text>
                    The advice right now is to make your password a combination
                    of three memorable but random words. Obvs, your password has
                    to be personal just to you. But, it’s best not to use
                    anything to do with GLAMO, your family or something about
                    you that can easily be found on social media. Pick something
                    unique for your GLAMO account and don’t use it anywhere
                    else!
                  </Text>
                  <Container
                    align="center"
                    className="!align-middle !mx-auto pt-3 text-center"
                  >
                    <Button
                      href={url}
                      className="align-middle mx-auto bg-[#2d2d2d] text-xs tracking-wider text-white py-3 px-16 font-semibold text-center"
                    >
                      RESET PASSWORD
                    </Button>
                  </Container>
                </Column>
              </Row>

              <Row className='p-5'>
               
                <Column className='p-4 pt-0 bg-white'>
                  <Text className="bg-white text-sm font-semibold box-border w-full mb-2">
                    ISSUE WITH THE LINK?
                  </Text>
                  <Hr className="m-0 p-0" />
                  <Text>
                    Simply copy and paste this link into your browser instead:{' '}
                    <Link href={url}>{url}</Link>
                  </Text>
                </Column>
              </Row>

              <Row>
                <Thanks/>
              
              </Row>
            </Section>
          </Container>
        </Body>
      </EmailTailwind>
    </Html>
  );
}

export default PasswordReset;
