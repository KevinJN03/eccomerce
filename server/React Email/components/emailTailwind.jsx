import * as React from 'react';
import { Tailwind } from '@react-email/components';
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
  return (
    <Tailwind config={config} key={'tailwind'}>
      {children}
    </Tailwind>
  );
}

export default EmailTailwind;
