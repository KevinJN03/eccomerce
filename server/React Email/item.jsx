import * as React from 'react';

import { useEffect, Fragment } from 'react';
import { v4 as uuid } from 'uuid';
import { Text, Img, Row, Column } from '@react-email/components';

function Item({ variation1, variation2, product, price, quantity } ) {
  return (
    <Row className="mb-4">
      <Column className="w-[100px] h-[140px]">
        <Img
          src={product?.images?.[0]}
          className="border-none outline-none w-[100px] h-[140px]"
        />
      </Column>
      <Column className="pl-5 align-top">
        <Text className="text-s p-0 pb-1 m-0 font-medium">
          {product?.title}
        </Text>

        <Text className="text-s p-0 pb-1 m-0 font-semibold">
          £{parseFloat(price?.toFixed(2))}
        </Text>

        <Text className="text-xs p-0 pb-1 m-0 font-light !important">
          {`${variation1?.variation ? variation1?.variation : ''} ${
            variation2?.variation ? ' / ' + variation2.variation : ''
          } / Qty ${quantity}`}
        </Text>
      </Column>
    </Row>
  );
}

export default Item;
