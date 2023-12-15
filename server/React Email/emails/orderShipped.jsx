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
} from '@react-email/components';
import Header from '../components/header.jsx';
import EmailHead from '../components/emailHead.jsx';
import EmailTailwind from '../components/emailTailwind.jsx';
import dayjs from 'dayjs';
import Item from '../components/item.jsx';
import Thanks from '../components/thanks.jsx';
import Footer from '../components/footer.jsx';
function OrderShipped({ order }) {
  const orderDate = dayjs(order?.createdAt).format('dddd DD MMMM YYYY');
  return (
    <Html lang="en">
      <EmailHead />
      <EmailTailwind>
        <Body>
          <Container
            className="!bg-light-grey w-[600px] max-w-[600px]"
            align="center"
          >
            <Section className="" align="center">
              <Row>
                <Header />
              </Row>
              <Row>
                <Column className="text-center p-4" align="center">
                  <Img
                    src={
                      'https://aws-glamo-upload-bucket.s3.eu-west-2.amazonaws.com/files/logos/icons8-box-64.png'
                    }
                    className="w-8 h-8 mx-auto"
                  />
                  <Text className="font-bold">WE’VE SENT IT!</Text>
                  <Text>
                    Hi {order?.customer?.firstName}, your parcel is on its way
                    and it should be with you soon!
                  </Text>
                  <Text>Order No.: {order?._id}</Text>

                  <Text>Order date: {orderDate}</Text>
                  <Text>
                    Estimated delivery date:{' '}
                    {order?.shipping_option?.delivery_date}
                  </Text>
                  <Button className="tracking-wider py-2 bg-[#2d2d2d] font-semibold px-12 text-white">
                    TRACK PARCEL
                  </Button>
                </Column>
              </Row>

              <Row className=" !bg-light-grey">
                <Container className="p-4 !bg-light-grey">
                  <Column className="bg-white p-3">
                    <Text>DELIVERY DETAILS</Text>
                    <Hr />
                    <Text> DELIVERY ADDRESS</Text>
                    <Container>
                      <Text>{order?.shipping_address?.name}</Text>

                      <Text>{order?.shipping_address?.address?.line1}</Text>

                      {order?.shipping_address?.address?.line2 && (
                        <Text>{order?.shipping_address?.address?.line2}</Text>
                      )}

                      <Text>
                        {`${order?.shipping_address?.address?.postal_code} ${order?.shipping_address?.address?.state}, ${order?.shipping_address?.address?.country}`}
                      </Text>

                      <Text>{order?.shipping_address?.phone}</Text>
                    </Container>
                    <Text>DELIVERY METHOD</Text>

                    <Text>{order?.shipping_option?.name}</Text>
                  </Column>
                </Container>
              </Row>

              <Row className=" !bg-light-grey">
                <Container className="p-4 !bg-light-grey">
                  <Column className="bg-white p-3">
                    <Text>
                      {`${order?.items?.length} ${
                        order?.items?.length > 1 ? 'ITEMS' : 'ITEM'
                      } SENT`}
                    </Text>
                    <Hr />
                    <Text>
                      Estimated delivery date:{' '}
                      {order?.shipping_option?.delivery_date}
                    </Text>
                    <Hr />
                    <Row className="bg-white " align="center">
                      <Column className="px-4 pb-0 bg-white" align="center">
                        <Section className="bg-white">
                          {order?.items?.map((itemProps, idx) => {
                            return <Item {...itemProps} key={idx} />;
                          })}
                        </Section>
                        <Hr />
                        <Button className="tracking-wider py-2 bg-[#2d2d2d] font-semibold px-12 text-white">
                          TRACK PARCEL
                        </Button>
                      </Column>
                    </Row>
                  </Column>
                </Container>
              </Row>
              <Row>
                <Container>
                    <Thanks />  
                </Container>
              
              </Row>
              <Row>
                <Container>
                    <Footer/> 
                </Container>
              
              </Row>
            </Section>
          </Container>
        </Body>
      </EmailTailwind>
    </Html>
  );
}

export default OrderShipped;
