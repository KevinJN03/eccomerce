import * as React from 'react';
import { useEffect, Fragment } from 'react';
import { v4 as uuid } from 'uuid';
import {
  Font,
} from '@react-email/components';

function EmailHead({}) {
  return (
    <Font
      fontFamily="Poppins"
      fallbackFontFamily="Verdana"
      webFont={{
        url: 'https://dknhps0hwilzj.cloudfront.net/fonts/Poppins-Regular.ttf',
        format: 'ttf',
      }}
      fontWeight={400}
      fontStyle="normal"
    ></Font>
  );
}

export default EmailHead;
