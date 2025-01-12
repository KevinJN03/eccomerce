import * as React from 'react';
import { Body, Container } from '@react-email/components';

function EmailBody({ children }) {
  return (
    <Body className="!min-w-full w-full" id='emailBody'>
      <Container className="bg-light-grey !max-w-[37.5rem] !w-[37.5rem]" align="center">
        {children}
      </Container>
    </Body>
  );
} 

export default EmailBody;
