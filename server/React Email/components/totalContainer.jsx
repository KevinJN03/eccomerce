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
import _ from 'lodash';

function TotalContainer({ order, showRefund }) {
  const array = [
    {
      title: 'SUB-TOTAL',
      cost: order?.transaction_cost?.subtotal?.toFixed(2),
    },
    {
      title: 'DELIVERY',
      cost: parseFloat(
        _.get(order, ['transaction_cost', 'delivery_cost']) || 0,
      ).toFixed(2),
    },
    {
      title: 'TOTAL',
      cost: order?.transaction_cost?.total?.toFixed(2),
    },
  ];

  const discount = _.get(order, ['transaction_cost', 'promo', 'discount']);
  if (discount > 0) {
    array.splice(1, 0, {
      title: 'DISCOUNT',
      cost: parseFloat(discount).toFixed(2),
    });
  }

  if (_.get(order, 'refund.amount')) {
    array.push({
      title: 'REFUND',
      cost: _.get(order, 'refund.amount').toFixed(2),
    });
  }
  return (
    // <Section className="bg-white w-full min-w-full">
    <Container id="test12345" className="w-full m-0 p-0 !max-w-full">
      <Section className="w-full">
        {array.map(({ title, cost }) => {
          return (
            <Fragment key={uuid()}>
              {title == 'TOTAL' && <Hr className="bg-black" />}

              <Row className="w-full">
                <Column className="w-full">
                  <Text
                    className={`${
                      title == 'REFUND' ? 'text-red-700' : ' text-dark-gray'
                    } font-semibold p-0 m-0 text-sm  text-left tracking-wider`}
                  >
                    {title}{' '}
                  </Text>
                </Column>
                <Column className="w-full">
                  <Text
                    className={`${
                      title == 'REFUND' ? 'text-red-700' : ' text-dark-gray'
                    } text-right p-0 m-0 text-s flex whitespace-nowrap  tracking-wider`}
                  >
                    {title == 'DISCOUNT' || title == 'REFUND' && '-'}£{cost}
                  </Text>
                </Column>
              </Row>
            </Fragment>
          );
        })}
      </Section>
    </Container>
    //  </Section>
  );
}

export default TotalContainer;
