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
} from '@react-email/components';
function Thanks({ className }) {
  return (
    <Container
      className={` bg-light-grey text-center my-4 `}
      align="center"
    >
      <Text className="m-0 p-0 text-xs text-center">Thanks,</Text>

      <Text className="m-0 p-0 font-semibold text-xs text-center">The GLAMO team</Text>
    </Container>
  );
}

export default Thanks;
