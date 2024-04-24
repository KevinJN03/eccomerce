import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
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

const url = 'https://dknhps0hwilzj.cloudfront.net/files/logos';
function Footer({}) {
  const icons = [
    { icon: `icons8-facebook-48+(1).png` },

    {
      icon: 'icons8-instagram-48+(1).png',
      shinkIcon: true,
      style: {
        background: 'linear-gradient(115deg, #f9ce34, #ee2a7b, #6228d7)',
      },
    },
    {
      icon: 'icons8-pinterest-48.png',
    },
    {
      icon: 'icons8-twitter-50.png',
      style: {
        background: '#1da1f2',
      },
      shinkIcon: true,
    },
    {
      icon: 'icons8-tiktok-48.png',
      style: {
        background: '#eee',
      },
      shinkIcon: true,
    },
  ];
  return (
    <Container className="bg-[#333333] text-white !min-w-[600px] max-w-[600px] w-full">
      <td className="p-5 ">
        <Section>
          <Row align="center">
            <Column className="!border-r-2 !border-green-500 pb-4">
              <Text className="text-center font-bold text-white">
                Find inspiration
              </Text>
              {/* <Container> */}
              <Row className="w-full border-spacing-x-4 text-center border border-red-600" >
                  {icons.map(
                    ({
                      icon,
                      style,
                      imgStyle,

                      shinkIcon,
                    }) => {
                      return (
                        <Column
                          key={uuidv4()}
                          className="!w-7 !h-7 text-center rounded-full align-middle flex flex-row flex-nowrap"
                          align="center"
                          style={style}
                        >
                          <Img
                            src={`${url}/${icon}`}
                            style={imgStyle}
                            className={`${
                              shinkIcon ? 'flex-1' : 'w-full h-full'
                            } object-contain mx-auto`}
                          />
                        </Column>
                      );
                    },
                  )}
              </Row>
            </Column>
            <Column
              className="w-[1px] !bg-light-grey text-center h-full"
              align="center"
            ></Column>
            <Column className="pb-4">
              <Text className="text-center font-bold tracking-wider text-white">
                Get the app
              </Text>

              <Row className="w-fit border-spacing-x-1">
                <Column className="!w-[100px] !h-[28px]">
                  <Img
                    src={`${url}/google-badge.png`}
                    className="w-[100px] !h-[28px]"
                  />
                </Column>
                <Column className="!w-[100px]">
                  <Img
                    src={`${url}/apple-badge.png`}
                    className="w-[100px] !h-[28px]"
                  />
                </Column>
              </Row>
            </Column>
          </Row>

          {/* <Row className='mt-20'> */}
          <Text className="pt-10 text-xs leading-4">
            *GLAMO has estimated this date on the basis of your expected
            delivery date and the refunds window applicable to your
            jurisdiction. Please see website T&Cs for more details on returns
            and refunds, and for the refunds window applicable to your
            jurisdiction.
          </Text>
          <Text className="text-xs leading-4">
            This inbox is not attended so please don’t reply to this email. This
            is a service email. You will receive these no matter what your
            marketing communication preferences are.
          </Text>
          <Text className="text-xs leading-4">
            We’ll always keep your data safe and secure. Click here to know why
            we need it and how we use it.
          </Text>
          {/* </Row> */}
        </Section>
      </td>
    </Container>
  );
}

export default Footer;
