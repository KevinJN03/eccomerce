import * as React from 'react';
import {
  Font,
} from '@react-email/components';
import 'dotenv/config';
function EmailHead({}) {
  return (
    <Font
      fontFamily="Poppins"
      fallbackFontFamily="Verdana"
      webFont={{
        url: `${process.env.CLOUDFRONT_URL}/fonts/Poppins-Regular.ttf`,
        format: 'ttf',
      }}
      fontWeight={400}
      fontStyle="normal"
    ></Font>
  );
}

export default EmailHead;
