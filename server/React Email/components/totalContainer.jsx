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

function TotalContainer({ subtotal, deliveryCost, total }) {
  return (
    <Section className="bg-white px-5">
      <Row>
        <Column>
          <Text className="font-semibold p-0 m-0 text-sm  text-dark-gray text-left tracking-wider">
            SUB-TOTAL
          </Text>
        </Column>
        <Column>
          <Text className="text-right p-0 m-0 text-s  tracking-wider">
            £{subtotal}
          </Text>
        </Column>
      </Row>
      <Row>
        <Column>
          <Text className="font-semibold p-0 m-0 text-sm  text-dark-gray text-left tracking-wider">
            DELIVERY
          </Text>
        </Column>
        <Column>
          <Text className="text-right p-0 m-0 text-s  tracking-wider">
            £{deliveryCost}
          </Text>
        </Column>
      </Row>
      <Hr className="bg-black" />
      <Row>
        <Column className="pb-6 align-top">
          <Text className="font-semibold p-0 m-0 text-sm tracking-wider">
            TOTAL
          </Text>
        </Column>
        <Column className="align-top">
          <Text className="text-right text-s font-semibold tracking-wider p-0 m-0  align-top">
            £{total}
          </Text>
        </Column>
      </Row>
    </Section>
  );
}

export default TotalContainer;
