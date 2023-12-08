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
      className={`${
        className ? className : 'py-4'
      } bg-light-grey text-center m-0 !min-w-[600px] max-w-[600px]`}
      align="center"
    >
      <Text className="m-0 p-0 text-xs">Thanks,</Text>

      <Text className="m-0 p-0 font-semibold text-xs">The GLAMO team</Text>
    </Container>
  );
}

export default Thanks;
