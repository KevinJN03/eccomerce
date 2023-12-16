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
} from '@react-email/components';

function TotalContainer({ order }) {
  return (
    // <Section className="bg-white w-full min-w-full">
    <Container id="test12345" className="w-full m-0 p-0 !max-w-full">
      <Section className="w-full">
        <Row className="w-full">
          <Column className="w-full">
            <Text className="font-semibold p-0 m-0 text-sm  text-dark-gray text-left tracking-wider">
              SUB-TOTAL
            </Text>
          </Column>
          <Column className="w-full">
            <Text className="text-right p-0 m-0 text-s  tracking-wider">
              £{order?.transaction_cost?.subtotal?.toFixed(2)}
            </Text>
          </Column>
        </Row>
        <Row className="w-full">
          <Column className="w-full">
            <Text className="font-semibold p-0 m-0 text-sm  text-dark-gray text-left tracking-wider">
              DELIVERY
            </Text>
          </Column>
          <Column>
            <Text className="text-right p-0 m-0 text-s  tracking-wider">
              £{order?.shipping_option?.cost?.toFixed(2)}
            </Text>
          </Column>
        </Row>
        <Hr className="bg-black" />
        <Row className="w-full">
          <Column className="pb-0 align-top w-full">
            <Text className="font-semibold p-0 m-0 text-sm tracking-wider">
              TOTAL
            </Text>
          </Column>
          <Column className="align-top">
            <Text className="text-right text-s font-semibold tracking-wider p-0 m-0  align-top">
              £{order?.transaction_cost?.total?.toFixed(2)}
            </Text>
          </Column>
        </Row>
      </Section>
    </Container>
    //  </Section>
  );
}

export default TotalContainer;
