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
} from '@react-email/components';
import { v4 as uuidv4 } from 'uuid';
const logos = {
  afterpay: 'afterpay.png',
  amex: 'american-express.png',
  klarna: 'klarna.png',
  maestro: 'maestro.png',
  mastercard: 'mastercard-alt.png',
  paypal: 'paypal.png',
  'union-pay': 'union-pay.png',
};

export default function OrderSuccess({
  firstName,
  shipping_address,
  subtotal,
  orderNumber,
  orderDate,
  deliveryCost,
  total,
  paymentType,
  deliveryName,
  items,
}) {
  // const { firstName, shipping_address, subtotal, orderNumber, orderDate, deliveryCost, total, paymentType } = props;
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

  const url = 'https://dknhps0hwilzj.cloudfront.net/files/logos';

  return (
    <Html lang="en">
      <Head />

      <Tailwind config={config}>
        <Body
          data-new-gr-c-s-loaded="14.1143.0"
          style={{
            width: '100%',
            fontFamily: "arial, 'helvetica neue', helvetica, sans-serif",
            WebkitTextSizeAdjust: '100%',
            MsTextSizeAdjust: '100%',
            padding: '0',
            margin: '0',
          }}
        >
          <div
            dir="ltr"
            className="es-wrapper-color"
            lang="EN"
            style={{
              backgroundColor: '#f6f6f6',
            }}
          >
            {/* <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#f6f6f6"></v:fill>
          </v:background> */}

            <table
              className="es-wrapper"
              width="100%"
              cellSpacing="0"
              cellPadding="0"
              style={{
                msoTableLspace: '0pt',
                msoTableRspace: '0pt',
                borderCollapse: 'collapse',
                borderSpacing: '0px',
                padding: '0',
                margin: '0',
                width: '100%',
                height: '100%',
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center top',
                backgroundColor: '#f6f6f6',
              }}
            >
              <tr>
                <td valign="top" style={{ padding: 0, margin: 0 }}>
                  <table
                    className="es-header"
                    cellSpacing="0"
                    cellPadding="0"
                    align="center"
                    style={{
                      msoTableLspace: '0pt',
                      msoTableRspace: '0pt',
                      borderCollapse: 'collapse',
                      borderSpacing: '0px',
                      tableLayout: 'fixed !important',
                      width: '100%',
                      backgroundColor: 'transparent',
                      backgroundRepeat: 'repeat',
                      backgroundPosition: 'center top',
                    }}
                  >
                    <tr>
                      <td align="center" style={{ padding: 0, margin: 0 }}>
                        <table
                          className="es-header-body"
                          cellSpacing="0"
                          cellPadding="0"
                          bgcolor="#eee"
                          align="center"
                          style={{
                            msoTableLspace: '0pt',
                            msoTableRspace: '0pt',
                            borderCollapse: 'collapse',
                            borderSpacing: '0px',
                            backgroundColor: '#eeeeee',
                            width: '600px',
                          }}
                        >
                          <tr>
                            <td
                              align="left"
                              style={{ padding: '0', margin: '0' }}
                            >
                              <table
                                cellPadding="0"
                                cellSpacing="0"
                                width="100%"
                                style={{
                                  msoTableLspace: '0pt',
                                  msoTableRspace: '0pt',
                                  borderCollapse: 'collapse',
                                  borderSpacing: '0px',
                                }}
                              >
                                <tr>
                                  <td
                                    align="center"
                                    valign="top"
                                    style={{
                                      padding: '0',
                                      margin: '0',
                                      width: '600px',
                                    }}
                                  >
                                    <table
                                      cellPadding="0"
                                      cellSpacing="0"
                                      width="100%"
                                      bgcolor="#2d2d2d"
                                      style={{
                                        msoTableLspace: '0pt',
                                        msoTableRspace: '0pt',
                                        borderCollapse: 'collapse',
                                        borderSpacing: '0px',
                                        backgroundColor: '#2d2d2d',
                                      }}
                                    >
                                      <tr>
                                        <td
                                          style={{ padding: '0', margin: '0' }}
                                        >
                                          <img
                                            src="https://fbtskzl.stripocdn.email/content/guids/CABINET_b2c54c9f4f7a6a37ee9f194178460c55773a1f517775c0801028dbe0265558ca/images/glamo_2SY.png"
                                            style={{
                                              display: 'block',
                                              border: '0',
                                              outline: 'none',
                                              textDecoration: 'none',
                                              msInterpolationMode: 'bicubic',
                                              width: '100px',
                                              margin: '0px auto',
                                              padding: '20px',
                                            }}
                                            alt="Logo"
                                          />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                          <tr>
                            <td
                              align="left"
                              style={{
                                padding: '0',
                                margin: '0',
                                paddingTop: '20px',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                              }}
                            >
                              <table
                                cellPadding="0"
                                cellSpacing="0"
                                width="100%"
                                style={{
                                  msoTableLspace: '0pt',
                                  msoTableRspace: '0pt',
                                  borderCollapse: 'collapse',
                                  borderSpacing: '0px',
                                }}
                              >
                                <tr>
                                  <td
                                    align="center"
                                    valign="top"
                                    style={{
                                      padding: '0',
                                      margin: '0',
                                      width: '560px',
                                    }}
                                  >
                                    <table
                                      cellPadding="0"
                                      cellSpacing="0"
                                      width="100%"
                                      style={{
                                        msoTableLspace: '0pt',
                                        msoTableRspace: '0pt',
                                        borderCollapse: 'collapse',
                                        borderSpacing: '0px',
                                      }}
                                    >
                                      <tr>
                                        <td
                                          style={{ padding: '0', margin: '0' }}
                                        >
                                          <img
                                            src="https://fbtskzl.stripocdn.email/content/guids/CABINET_b2c54c9f4f7a6a37ee9f194178460c55773a1f517775c0801028dbe0265558ca/images/icons8box64.png"
                                            style={{
                                              display: 'block',
                                              border: '0',
                                              outline: 'none',
                                              textDecoration: 'none',
                                              msInterpolationMode: 'bicubic',
                                              width: '30px',
                                              height: '30px',
                                              margin: '0px auto',
                                            }}
                                            alt="Icon"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="center"
                                          style={{
                                            padding: '0',
                                            margin: '0',
                                            paddingTop: '15px',
                                            paddingBottom: '15px',
                                          }}
                                        >
                                          <p
                                            style={{
                                              margin: '0',
                                              WebkitTextSizeAdjust: 'none',
                                              MsTextSizeAdjust: 'none',
                                              msoLineHeightRule: 'exactly',
                                              fontFamily:
                                                'arial, helvetica neue, helvetica, sans-serif',
                                              lineHeight: '17px',
                                              color: '#333333',
                                              fontSize: '14px',
                                            }}
                                          >
                                            <b>IT’S ORDERED!</b>
                                          </p>
                                          <Text>
                                            {' '}
                                            Hi {firstName}, your order has been
                                            received.
                                          </Text>
                                          <Text>Order No.: {orderNumber}</Text>
                                          <Text>Order date: {orderDate}</Text>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                          <tr>
                            <td
                              align="left"
                              style={{
                                padding: '0',
                                margin: '0',
                                paddingTop: '20px',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                              }}
                            >
                              <table
                                cellPadding="0"
                                cellSpacing="0"
                                width="100%"
                                style={{
                                  msoTableLspace: '0pt',
                                  msoTableRspace: '0pt',
                                  borderCollapse: 'collapse',
                                  borderSpacing: '0px',
                                }}
                              >
                                <tr>
                                  <td
                                    align="center"
                                    valign="top"
                                    style={{
                                      padding: '0',
                                      margin: '0',
                                      width: '560px',
                                    }}
                                  >
                                    <table
                                      cellPadding="0"
                                      cellSpacing="0"
                                      width="100%"
                                      style={{
                                        msoTableLspace: '0pt',
                                        msoTableRspace: '0pt',
                                        borderCollapse: 'collapse',
                                        borderSpacing: '0px',
                                      }}
                                    >
                                      <tr>
                                        <td
                                          align="left"
                                          bgcolor="#ffffff"
                                          style={{
                                            padding: '0',
                                            margin: '0',
                                            paddingLeft: '15px',
                                            paddingRight: '15px',
                                            paddingTop: '20px',
                                          }}
                                        >
                                          <p
                                            style={{
                                              margin: '0',
                                              WebkitTextSizeAdjust: 'none',
                                              MsTextSizeAdjust: 'none',
                                              msoLineHeightRule: 'exactly',
                                              fontFamily:
                                                'arial, helvetica neue, helvetica, sans-serif',
                                              lineHeight: '21px',
                                              color: '#333333',
                                              fontSize: '14px',
                                            }}
                                          >
                                            <strong>DELIVERY DETAILS</strong>
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="center"
                                          style={{
                                            margin: '0',
                                            paddingTop: '10px',
                                            paddingLeft: '15px',
                                            paddingRight: '15px',
                                            paddingBottom: '20px',
                                            fontSize: '0',
                                          }}
                                          bgcolor="#ffffff"
                                        >
                                          <table
                                            border="0"
                                            width="100%"
                                            height="100%"
                                            cellPadding="0"
                                            cellSpacing="0"
                                            style={{
                                              msoTableLspace: '0pt',
                                              msoTableRspace: '0pt',
                                              borderCollapse: 'collapse',
                                              borderSpacing: '0px',
                                            }}
                                          >
                                            <tr>
                                              <td
                                                style={{
                                                  padding: '0',
                                                  margin: '0',
                                                  borderBottom:
                                                    '2px solid #cccccc',
                                                  background: 'unset',
                                                  height: '1px',
                                                  width: '100%',
                                                  margin: '0px',
                                                }}
                                              ></td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="left"
                                          bgcolor="#ffffff"
                                          style={{
                                            padding: '0',
                                            margin: '0',
                                            paddingLeft: '15px',
                                            paddingRight: '15px',
                                            paddingBottom: '25px',
                                          }}
                                        >
                                          <p
                                            // style={{
                                            //   margin: '0',
                                            //   WebkitTextSizeAdjust: 'none',
                                            //   MsTextSizeAdjust: 'none',
                                            //   msoLineHeightRule: 'exactly',
                                            //   fontFamily:
                                            //     'arial, helvetica neue, helvetica, sans-serif',
                                            //   lineHeight: '21px',
                                            //   color: '#333333',
                                            //   fontSize: '14px',
                                            // }}

                                            className="p-0 m-0 pb-3 "
                                          >
                                            <strong>DELIVERY ADDRESS</strong>
                                          </p>

                                          <p className="p-0 m-0 pb-1">
                                            {shipping_address?.name}
                                          </p>
                                          <p className="p-0 m-0 pb-1">
                                            {shipping_address?.address?.line1}
                                          </p>

                                          {shipping_address?.address?.line2 && (
                                            <p className="p-0 m-0 pb-1">
                                              {shipping_address?.address?.line2}
                                            </p>
                                          )}

                                          <p className="p-0 m-0 pb-1">
                                            {`${shipping_address?.address?.postal_code?.toUpperCase()} ${
                                              shipping_address?.address?.city
                                            }, ${
                                              shipping_address?.address?.country
                                            }`}
                                          </p>

                                          <p className="p-0 m-0 pb-1">
                                            {shipping_address?.phone}
                                          </p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                          <tr>
                            <td
                              align="left"
                              style={{
                                padding: '0',
                                margin: '0',
                                paddingTop: '20px',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                              }}
                            >
                              <table
                                cellPadding="0"
                                cellSpacing="0"
                                width="100%"
                                style={{
                                  msoTableLspace: '0pt',
                                  msoTableRspace: '0pt',
                                  borderCollapse: 'collapse',
                                  borderSpacing: '0px',
                                }}
                              >
                                <tr>
                                  <td
                                    align="center"
                                    valign="top"
                                    style={{
                                      padding: '0',
                                      margin: '0',
                                      width: '560px',
                                    }}
                                  >
                                    <table
                                      cellPadding="0"
                                      cellSpacing="0"
                                      width="100%"
                                      style={{
                                        msoTableLspace: '0pt',
                                        msoTableRspace: '0pt',
                                        borderCollapse: 'collapse',
                                        borderSpacing: '0px',
                                      }}
                                    >
                                      <tr>
                                        <td
                                          align="left"
                                          bgcolor="#ffffff"
                                          style={{
                                            padding: '0',
                                            margin: '0',
                                            paddingLeft: '15px',
                                            paddingRight: '15px',
                                            paddingTop: '20px',
                                          }}
                                        >
                                          <p
                                            style={{
                                              margin: '0',
                                              WebkitTextSizeAdjust: 'none',
                                              MsTextSizeAdjust: 'none',
                                              msoLineHeightRule: 'exactly',
                                              fontFamily:
                                                'arial, helvetica neue, helvetica, sans-serif',
                                              lineHeight: '21px',
                                              color: '#333333',
                                              fontSize: '14px',
                                            }}
                                          >
                                            <strong>
                                              <b>YOUR ORDER</b>
                                            </strong>
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="center"
                                          style={{
                                            margin: '0',
                                            paddingTop: '10px',
                                            paddingBottom: '10px',
                                            paddingLeft: '15px',
                                            paddingRight: '15px',
                                            fontSize: '0',
                                          }}
                                          bgcolor="#ffffff"
                                        >
                                          <table
                                            border="0"
                                            width="100%"
                                            height="100%"
                                            cellPadding="0"
                                            cellSpacing="0"
                                            style={{
                                              msoTableLspace: '0pt',
                                              msoTableRspace: '0pt',
                                              borderCollapse: 'collapse',
                                              borderSpacing: '0px',
                                            }}
                                          >
                                            <tr>
                                              <td
                                                style={{
                                                  padding: '0',
                                                  margin: '0',
                                                  borderBottom:
                                                    '2px solid #cccccc',
                                                  background: 'unset',
                                                  height: '1px',
                                                  width: '100%',
                                                  margin: '0px',
                                                }}
                                              ></td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="left"
                                          bgcolor="#ffffff"
                                          style={{
                                            padding: '0',
                                            margin: '0',
                                            paddingLeft: '15px',
                                            paddingRight: '15px',
                                          }}
                                        >
                                          <p
                                            style={{
                                              margin: '0',
                                              WebkitTextSizeAdjust: 'none',
                                              MsTextSizeAdjust: 'none',
                                              msoLineHeightRule: 'exactly',
                                              fontFamily:
                                                'arial, helvetica neue, helvetica, sans-serif',
                                              lineHeight: '21px',
                                              color: '#333333',
                                              fontSize: '14px',
                                            }}
                                          >
                                            <strong>
                                              <span
                                                style={{ color: '#008000' }}
                                              >
                                                Estimated delivery date:
                                                Thursday 07 December 2023
                                              </span>
                                            </strong>
                                          </p>
                                          <p
                                            style={{
                                              margin: '0',
                                              WebkitTextSizeAdjust: 'none',
                                              MsTextSizeAdjust: 'none',
                                              msoLineHeightRule: 'exactly',
                                              fontFamily:
                                                'arial, helvetica neue, helvetica, sans-serif',
                                              lineHeight: '21px',
                                              color: '#000000',
                                              fontSize: '14px',
                                            }}
                                          >
                                            Delivery method: {deliveryName}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{ padding: '0', margin: '0' }}
                                        >
                                          <Section className="bg-white p-5 pt-6">
                                            {items?.map(
                                              (
                                                {
                                                  product,
                                                  quantity,
                                                  variation1,
                                                  variation2,
                                                  price,
                                                },
                                                idx,
                                              ) => {
                                                return (
                                                  <Row
                                                    key={idx}
                                                    className="mb-4"
                                                  >
                                                    <Column className="w-[100px] h-[140px]">
                                                      <Img
                                                        src={
                                                          product?.images?.[0]
                                                        }
                                                        className="border-none outline-none w-[100px] h-[140px]"
                                                      />
                                                    </Column>
                                                    <Column className="pl-5 align-top">
                                                      <Text className="text-s p-0 pb-1 m-0 font-medium">
                                                        {product?.title}
                                                      </Text>

                                                      <Text className="text-s p-0 pb-1 m-0 font-semibold">
                                                        £
                                                        {parseFloat(
                                                          price?.toFixed(2),
                                                        )}
                                                      </Text>

                                                      <Text className="text-xs p-0 pb-1 m-0 font-light !important">
                                                        {`${
                                                          variation1?.variation
                                                            ? variation1?.variation
                                                            : ''
                                                        } ${
                                                          variation2?.variation
                                                            ? ' / ' +
                                                              variation2.variation
                                                            : ''
                                                        } / Qty ${quantity}`}
                                                      </Text>
                                                    </Column>
                                                  </Row>
                                                );
                                              },
                                            )}
                                          </Section>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="center"
                                          style={{
                                            margin: '0',
                                            paddingTop: '10px',
                                            paddingBottom: '10px',
                                            paddingLeft: '20px',
                                            paddingRight: '20px',
                                            fontSize: '0',
                                          }}
                                          bgcolor="#ffffff"
                                        >
                                          <table
                                            border="0"
                                            width="100%"
                                            height="100%"
                                            cellPadding="0"
                                            cellSpacing="0"
                                            style={{
                                              msoTableLspace: '0pt',
                                              msoTableRspace: '0pt',
                                              borderCollapse: 'collapse',
                                              borderSpacing: '0px',
                                            }}
                                          >
                                            <tr>
                                              <td
                                                style={{
                                                  padding: '0',
                                                  margin: '0',
                                                  borderBottom:
                                                    '1px solid #cccccc',
                                                  background: 'unset',
                                                  height: '1px',
                                                  width: '100%',
                                                  margin: '0px',
                                                }}
                                              ></td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>

                                      <tr>
                                        <td
                                          style={{ padding: '0', margin: '0' }}
                                        >
                                          <Section className="bg-white px-5">
                                            <Row>
                                              <Column>
                                                <Text className="font-semibold p-0 m-0 text-sm  text-dark-gray text-left tracking-wider">
                                                  SUB-TOTAL
                                                </Text>
                                              </Column>
                                              <Column>
                                                <Text className="text-right p-0 m-0 text-s  tracking-wider">
                                                  £{subtotal}
                                                </Text>
                                              </Column>
                                            </Row>
                                            <Row>
                                              <Column>
                                                <Text className="font-semibold p-0 m-0 text-sm  text-dark-gray text-left tracking-wider">
                                                  DELIVERY
                                                </Text>
                                              </Column>
                                              <Column>
                                                <Text className="text-right p-0 m-0 text-s  tracking-wider">
                                                  £{deliveryCost}
                                                </Text>
                                              </Column>
                                            </Row>
                                            <Hr className="bg-black" />
                                            <Row>
                                              <Column className="pb-6 align-top">
                                                <Text className="font-semibold p-0 m-0 text-sm tracking-wider">
                                                  TOTAL
                                                </Text>
                                              </Column>
                                              <Column className="align-top">
                                                <Text className="text-right text-s font-semibold tracking-wider p-0 m-0  align-top">
                                                  £{total}
                                                </Text>
                                              </Column>
                                            </Row>
                                          </Section>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                          <tr>
                            <td
                              align="left"
                              style={{
                                padding: '0',
                                margin: '0',
                                paddingTop: '20px',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                              }}
                            >
                              <Section className="bg-white p-5">
                                <Row>
                                  <Text className="font-semibold text-dark-gray tracking-wider text-base pt-1 pb-2 m-0 !important">
                                    {' '}
                                    PAYMENT DETAILS
                                  </Text>
                                </Row>
                                <Hr />
                                <Row>
                                  <Text className="m-0 p-0 font-bold text-dark-gray tracking-wider ">
                                    PAYMENT TYPE
                                  </Text>
                                </Row>
                                <Row className="mt-2 ">
                                  <Column
                                    id="payment"
                                    className="w-12 border-2 border-black"
                                  >
                                    <Img
                                      src={`${url}/${logos?.[paymentType]}`}
                                      alt="logo"
                                      title="logo"
                                      className="w-full h-auto bg-light-grey rounded-sm block h-8 object-cover"
                                    />
                                  </Column>
                                  <Column className="pl-4">Paypal</Column>
                                </Row>
                              </Section>
                            </td>
                          </tr>

                          <tr>
                            <td
                              align="left"
                              style={{
                                padding: '0',
                                margin: '0',
                                paddingTop: '20px',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                              }}
                            >
                              <table
                                cellPadding="0"
                                cellSpacing="0"
                                width="100%"
                                style={{
                                  msoTableLspace: '0pt',
                                  msoTableRspace: '0pt',
                                  borderCollapse: 'collapse',
                                  borderSpacing: '0px',
                                }}
                              >
                                <tr>
                                  <td
                                    align="center"
                                    valign="top"
                                    style={{
                                      padding: '0',
                                      margin: '0',
                                      width: '560px',
                                    }}
                                  >
                                    <Section className="bg-white p-5">
                                      <Text className="font-semibold text-base">
                                        CHANGED YOUR MIND?
                                      </Text>

                                      <Hr />

                                      <Text className="text-dark-gray font-semibold tracking-wider">
                                        CANCELLING AN ORDER
                                      </Text>

                                      <Text className="text-sm">
                                        We’re not able to make changes to your
                                        order, but you do have the option to
                                        cancel it. Find out more. Go to your
                                        order from the button below and follow
                                        the instructions.
                                      </Text>
                                      <Container
                                        className="align-middle px-auto text-center"
                                        align="center"
                                      >
                                        <Button className="text-center font-semibold w-2/4 py-3 text-sm border-2 border-solid border-light-grey tracking-wider">
                                          VIEW ORDER
                                        </Button>
                                      </Container>

                                      <Text className="text-dark-gray font-semibold tracking-wider ">
                                        RETURNING AN ORDER
                                      </Text>

                                      <Text className="text-sm">
                                        You also have the option to return any
                                        unwanted items by Monday 15 January
                                        2024*. However, for hygiene reasons
                                        there are some items that we can’t
                                        accept back and these will be sent back
                                        to you.
                                      </Text>

                                      <Container
                                        className="align-middle px-auto text-center"
                                        align="center"
                                      >
                                        <Button className="text-center font-semibold w-2/4 py-3 text-sm border-2 border-solid border-light-grey tracking-wider">
                                          RETURN INFORMATION
                                        </Button>
                                      </Container>
                                    </Section>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                          <Container
                            className="bg-light-grey text-center py-4 m-0 !min-w-[600px] max-w-[600px]"
                            align="center"
                          >
                            <Text className="m-0 p-0 text-xs">Thanks,</Text>

                            <Text className="m-0 p-0 font-semibold text-xs">
                              The GLAMO team
                            </Text>
                          </Container>

                          <Container className="bg-[#dedfe4] px-5 py-7 m-0 !min-w-[600px] max-w-[600px]">
                            <Text className="m-0 p-0 font-semibold text-base pb-2">
                              ANY QUESTIONS?
                            </Text>
                            <Text className="m-0 p-0 pb-3 font-light">
                              For everything else you want to know…
                            </Text>
                            <Section id="section-table">
                              {[
                                {
                                  column1: {
                                    text: 'Payment, Promos & Gift Vouchers',
                                  },
                                  column2: { text: 'Order issues' },
                                },
                                {
                                  column1: { text: '	Delivery' },
                                  column2: { text: 'Customer Care' },
                                },
                              ].map(({ column1, column2 }, idx) => {
                                return (
                                  <tr
                                    id="text-row"
                                    className="w-full"
                                    key={idx}
                                  >
                                    {[column1, column2].map((column) => {
                                      return (
                                        <Fragment key={uuidv4()}>
                                          <Column className="w-6 h-6">
                                            <Img
                                              src="https://aws-glamo-upload-bucket.s3.eu-west-2.amazonaws.com/files/logos/icons8-duplicate-96.png"
                                              className="w-full h-full"
                                            />
                                          </Column>
                                          <Column className="pl-1 max-w-[100px]">
                                            <Text className="text-left text-xs font-semibold !w-fit underline underline-offset-2 decoration-2 decoration-dark-gray">
                                              {column.text}
                                            </Text>
                                          </Column>
                                        </Fragment>
                                      );
                                    })}
                                  </tr>
                                );
                              })}{' '}
                            </Section>
                          </Container>
                          <Container className="bg-[#333333] text-white p-5 !min-w-[600px] max-w-[600px] w-full">
                            <Section>
                              <Row align="center">
                                <Column>
                                  <Text className="text-center font-bold">
                                    Find inspiration
                                  </Text>
                                  {/* <Container> */}
                                  <Row
                                    className="w-fit border-spacing-x-4"
                                    align="center"
                                  >
                                    {[
                                      { icon: `icons8-facebook-48+(1).png` },

                                      {
                                        icon: 'icons8-instagram-48+(1).png',
                                        shinkIcon: true,
                                        style: {
                                          background:
                                            'linear-gradient(115deg, #f9ce34, #ee2a7b, #6228d7)',
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
                                    ].map(
                                      ({
                                        icon,
                                        style,
                                        imgStyle,

                                        shinkIcon,
                                      }) => {
                                        return (
                                          <Column
                                            key={uuidv4()}
                                            className="!w-7 !h-7 text-center rounded-full align-middle"
                                            align="center"
                                            style={style}
                                          >
                                            <Img
                                              src={`${url}/${icon}`}
                                              style={imgStyle}
                                              className={`${
                                                shinkIcon
                                                  ? '!w-[60%] !h-[60%]'
                                                  : 'w-full h-full'
                                              } object-contain mx-auto`}
                                            />
                                          </Column>
                                        );
                                      },
                                    )}
                                  </Row>
                                </Column>
                                <Column>
                                  <Text className="text-center font-bold tracking-wider">
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
                                *GLAMO has estimated this date on the basis of
                                your expected delivery date and the refunds
                                window applicable to your jurisdiction. Please
                                see website T&Cs for more details on returns and
                                refunds, and for the refunds window applicable
                                to your jurisdiction.
                              </Text>
                              <Text className="text-xs leading-4">
                                This inbox is not attended so please don’t reply
                                to this email. This is a service email. You will
                                receive these no matter what your marketing
                                communication preferences are.
                              </Text>
                              <Text className="text-xs leading-4">
                                We’ll always keep your data safe and secure.
                                Click here to know why we need it and how we use
                                it.
                              </Text>
                              {/* </Row> */}
                            </Section>
                          </Container>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </Body>
      </Tailwind>
    </Html>
  );
}
