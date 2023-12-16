import * as React from 'react'
import { Column, Img, Row } from "@react-email/components"

function Header({}){
  return (
    <Row className="bg-[#2d2d2d] py-4" align="center">
    <Column>
      <Img
        src={
          'https://aws-glamo-upload-bucket.s3.eu-west-2.amazonaws.com/files/logos/glamo.png'
        }
        className="w-32 mx-auto"
      />
    </Column>
  </Row>
  )
};

export default Header
