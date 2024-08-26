import * as React from 'react';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

function MoreQuestions({ preview }) {
  return (
    <Section className="bg-[#dedfe4] w-full p-5 w-full">
      {/* <Container className="bg-[#dedfe4] w-full">
        <div className={`p-5 w-full`}> */}
      <Text className="m-0 p-0 font-semibold text-base pb-2">
        ANY QUESTIONS?
      </Text>
      <Text className="m-0 p-0 pb-3 font-light">
        For everything else you want to know…
      </Text>
      <Section id="section-table">
        {[
          {
            column1: {
              text: 'Payment, Promos & Gift Vouchers',
            },
            column2: { text: 'Order issues' },
          },
          {
            column1: { text: '	Delivery' },
            column2: { text: 'Customer Care' },
          },
        ].map(({ column1, column2 }, idx) => {
          return (
            <tr id="text-row" className="w-full" key={idx}>
              {[column1, column2].map((column) => {
                return (
                  <Fragment key={uuidv4()}>
                    <Column className="w-6 h-6">
                      <Img
                        src="https://aws-glamo-upload-bucket.s3.eu-west-2.amazonaws.com/files/logos/icons8-duplicate-96.png"
                        className="w-full h-full"
                      />
                    </Column>
                    <Column className="pl-1 max-w-[100px]">
                      <Text className="text-left text-xs font-semibold !w-fit underline underline-offset-2 decoration-2 decoration-dark-gray">
                        {column.text}
                      </Text>
                    </Column>
                  </Fragment>
                );
              })}
            </tr>
          );
        })}{' '}
      </Section>
      {/* </td> */}
      {/* </div>
      </Container> */}
    </Section>
  );
}

export default MoreQuestions;
