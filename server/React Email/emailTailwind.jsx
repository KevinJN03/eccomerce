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
  Font,
} from '@react-email/components';

const config = {
  theme: {
    extend: {
      colors: {
        'dark-gray': '#676666',
        'light-grey': '#eeeeee',
      },
      fontSize: {
        s: '13px',
      },
    },
  },
};

function EmailTailwind({ children }) {
  return <Tailwind config={config}>{children}</Tailwind>;
}

export default EmailTailwind;
