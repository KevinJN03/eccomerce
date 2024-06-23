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
    <Container className="bg-[#333333] text-white p-5 border-[1.25rem] border-[#333333] min-w-full">
      {/* <td className="p-5 w-full"> */}
        <Section  >
          <Row align="center" className="w-full">
            <Column align='center' className=" pb-4 !w-full !mx-auto !max-w-[50%] ">
              <Text className="text-center font-bold text-white">
                Find inspiration
              </Text>
              <Row
                align="center"
                className="w-fit text-center"
              >
                {icons.map(
                  ({
                    icon,
                    style,
                    imgStyle,

                    shinkIcon,
                  }) => {
                    return (
                      <Column
                        key={icon}
                        align="center"
                        className="!w-fit m-0 !px-2"
                      >
                        <Container
                          className="!w-7 !h-7 !max-w-7 !max-h-7 !text-center rounded-full align-middle p-0"
                          style={style}
                        >
                          <Img
                            src={`${url}/${icon}`}
                            style={imgStyle}
                            className={`${
                              shinkIcon ? '!h-4 !w-4 mx-auto' : 'w-7 h-7'
                            } object-contain`}
                          />
                        </Container>
                      </Column>
                    );
                  },
                )}
              </Row>
            </Column>
            <Column className="!h-full !p-0 !min-h-full pl-4 text-center border-white border bg-white"></Column>

            <Column align="center" className=" !w-full !max-w-[50%] align-top">
              <Container
                align="center"
                className="w-full !text-center !mx-auto"
              >
                <Text className="text-center font-bold tracking-wider text-white">
                  Get the app
                </Text>
                <div className="mx-auto flex justify-center">
                  <Row
                    // align="center"
                    className="w-fit"
                  >
                    <Column className="!w-[100px] !h-[28px] !box-content !pr-2">
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
                </div>
              </Container>
            </Column>
          </Row>

          {/* <Row className='mt-20'> */}
          <Text className="pt-10 text-xs leading-4 text-white">
            *GLAMO has estimated this date on the basis of your expected
            delivery date and the refunds window applicable to your
            jurisdiction. Please see website T&Cs for more details on returns
            and refunds, and for the refunds window applicable to your
            jurisdiction.
          </Text>
          <Text className="text-xs leading-4 text-white">
            This inbox is not attended so please don’t reply to this email. This
            is a service email. You will receive these no matter what your
            marketing communication preferences are.
          </Text>
          <Text className="text-xs leading-4 text-white">
            We’ll always keep your data safe and secure. Click here to know why
            we need it and how we use it.
          </Text>
          {/* </Row> */}
        </Section>
      {/* </td> */}
    </Container>
  );
}

export default Footer;
