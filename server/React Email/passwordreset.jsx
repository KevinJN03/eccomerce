import * as React from 'react';

import { v4 as uuidv4 } from 'uuid';
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
    <Html lang="en" key={uuidv4()}>
      <EmailHead key={uuidv4()} />
      <EmailTailwind key={uuidv4()}>
        <Body key={uuidv4()}>
          <Container
            key={uuidv4()}
            className="bg-light-grey w-[600px] max-w-[600px]"
            align="center"
          >
            <Section className="" align="center" key={uuidv4()}>
              <Row key={uuidv4()}>
                <Header key={uuidv4()} />
              </Row>
              <Row className="p-5" key={uuidv4()}>
                {' '}
                <Column
                  key={uuidv4()}
                  align="center"
                  className="pt-4 bg-transparent box-border"
                >
                  <Img
                    key={uuidv4()}
                    src={`${CLOUDFRONT_URL}/files/logos/lock.png`}
                    className="bg-transparent w-7 h-7"
                  />
                  <Text
                    className="font-semibold text-base tracking-wider pb-0 mb-1"
                    key={uuidv4()}
                  >
                    YOUR PASSWORD RESET LINK IS READY
                  </Text>
                  <Text className="p-0 m-0" key={uuidv4()}>
                    Just click the link to reset it - but be quick, it expires
                    in 3 hours
                  </Text>
                </Column>
              </Row>
              <Row className="p-5 pt-0" key={uuidv4()}>
                <Column
                  className="bg-white box-border w-full p-4 pt-0"
                  key={uuidv4()}
                >
                  <Text
                    className="font-semibold text-sm tracking-wide mb-2"
                    key={uuidv4()}
                  >
                    WANT TO MAKE YOUR NEW PASSWORD STRONG?
                  </Text>
                  <Hr className="m-0 p-0" key={uuidv4()} />
                  <Text key={uuidv4()}>
                    The advice right now is to make your password a combination
                    of three memorable but random words. Obvs, your password has
                    to be personal just to you. But, it’s best not to use
                    anything to do with GLAMO, your family or something about
                    you that can easily be found on social media. Pick something
                    unique for your GLAMO account and don’t use it anywhere
                    else!
                  </Text>
                  <Container
                    key={uuidv4()}
                    align="center"
                    className="!align-middle !mx-auto pt-3 text-center"
                  >
                    <Button
                      key={uuidv4()}
                      href={url}
                      className="align-middle mx-auto bg-[#2d2d2d] text-xs tracking-wider text-white py-3 px-16 font-semibold text-center"
                    >
                      RESET PASSWORD
                    </Button>
                  </Container>
                </Column>
              </Row>

              <Row className="p-5" key={uuidv4}>
                <Column className="p-4 pt-0 bg-white" key={uuidv4}>
                  <Text
                    className="bg-white text-sm font-semibold box-border w-full mb-2"
                    key={uuidv4}
                  >
                    ISSUE WITH THE LINK?
                  </Text>
                  <Hr className="m-0 p-0" key={uuidv4} />
                  <Text key={uuidv4}>
                    Simply copy and paste this link into your browser instead:{' '}
                    <Link href={url}>{url}</Link>
                  </Text>
                </Column>
              </Row>

              <Row key={uuidv4}>
                <Thanks key={uuidv4} />
              </Row>
            </Section>
          </Container>
        </Body>
      </EmailTailwind>
    </Html>
  );
}

export default PasswordReset;
