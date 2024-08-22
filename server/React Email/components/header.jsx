import * as React from 'react';
import { Button, Column, Container, Img, Row } from '@react-email/components';
import 'dotenv/config';
const clientUrl = process.env.CLIENT_URL;
function Header({}) {
  return (
    <Row className="!bg-[#2d2d2d] w-full ">
      <Column align="center" className="text-center w-full ">
        <Container className="!text-center mx-auto ">
          <Button href={clientUrl} className="text-center  py-4 !bg-[#2d2d2d]">
            <Img
              src={
                'https://aws-glamo-upload-bucket.s3.eu-west-2.amazonaws.com/files/logos/glamo.png'
              }
              className="w-32"
            />
          </Button>
        </Container>
      </Column>
    </Row>
  );
}

export default Header;
