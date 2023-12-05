import * as React from 'react';

import { useEffect } from 'react';
import {
  Head,
  Tailwind,
  Html,
  Body,
  Text,
  Img,
  Section,
  Row,
} from '@react-email/components';
export default function Test(props) {
  console.log({ props });
  const { firstName } = props;

  return (
    <Html lang="en">
      <Head />
      {/* <head>
        <link
          rel="stylesheet"
          href="https://dknhps0hwilzj.cloudfront.net/files/styles.css"
        />
      </head> */}
      <Tailwind>
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
                                          <Text>
                                            Order No.: {props.orderNumber}
                                          </Text>
                                          <Text>
                                            Order date: {props.orderDate}
                                          </Text>
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
                                            <strong>DELIVERY ADDRESS</strong>
                                          </p>
                                          {/* More paragraphs go here */}
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
                                            Delivery method: Standard Delivery
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{ padding: '0', margin: '0' }}
                                        >
                                          <table
                                            style={{
                                              background: '#ffffff',
                                              padding: '20px',
                                              width: '100%',
                                            }}
                                          >
                                            <tr>
                                              <td style={{ width: '100px' }}>
                                                <Img
                                                  src={
                                                    'https://ci4.googleusercontent.com/proxy/ovLwDaQffyvxXsj5hpaFkC-lx9miC2-qAfHkG_gEz46F92nVi0PCx92dJX2Y56Z1L4kY_POV4fFq8ziKpD7nzoUqc1MYDE3ZCQ1-xAYgt0keAwRnMX4=s0-d-e1-ft#https://images.asos-media.com/products/image/205321575-1-washedteal'
                                                  }
                                                  className="border-none outline-none w-[100px] h-[140px]"
                                                />
                                              </td>
                                              <td
                                                style={{ verticalAlign: 'top' }}
                                              >
                                                <Section  className='ml-4 w-full h-full text-s'>
                                                  <Row >
                                                    <Text className='text-xs'>
                                                       Reclaimed Vintage waffle
                                                    beanie in washed teal
                                                    </Text>
                                                   
                                                  </Row>
                                                  <Row>
                                                    
                                                  <Text className='text-xs'>
                                                    £6.99</Text></Row>
                                                  <Row>
                                                  <Text className='text-xs'>
                                                    WASHED TEAL / One Size / Qty
                                                    1</Text>
                                                  </Row>
                                                </Section>
                                                {/* <table
                                                  style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    marginLeft: '15px',
                                                  }}
                                                >
                                                  <tr>
                                                    <td
                                                      style={{
                                                        WebkitTextSizeAdjust:
                                                          'none',
                                                        MsTextSizeAdjust:
                                                          'none',
                                                        msoLineHeightRule:
                                                          'exactly',
                                                        fontFamily:
                                                          'arial, helvetica neue, helvetica, sans-serif',
                                                        lineHeight: '21px',
                                                        color: '#333333',
                                                        fontSize: '14px',
                                                      }}
                                                    >
                                                      Reclaimed Vintage waffle
                                                      beanie in washed teal
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style={{
                                                        WebkitTextSizeAdjust:
                                                          'none',
                                                        MsTextSizeAdjust:
                                                          'none',
                                                        msoLineHeightRule:
                                                          'exactly',
                                                        fontFamily:
                                                          'arial, helvetica neue, helvetica, sans-serif',
                                                        lineHeight: '21px',
                                                        color: '#333333',
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        letterSpacing: '0.05em',
                                                      }}
                                                    >
                                                      £6.99
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style={{
                                                        WebkitTextSizeAdjust:
                                                          'none',
                                                        MsTextSizeAdjust:
                                                          'none',
                                                        msoLineHeightRule:
                                                          'exactly',
                                                        fontFamily:
                                                          'arial, helvetica neue, helvetica, sans-serif',
                                                        lineHeight: '21px',
                                                        color: '#333333',
                                                        fontSize: '14px',
                                                      }}
                                                    >
                                                      WASHED TEAL / One Size /
                                                      Qty 1
                                                    </td>
                                                  </tr>
                                                </table> */}
                                              </td>
                                            </tr>
                                          </table>
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
                                          <table
                                            className="total-table"
                                            style={{
                                              background: 'white',
                                              width: '100%',
                                            }}
                                          >
                                            <tr className="font-md">
                                              <td className="text-left font-md font-bold text-dark-gray py-5 px-1 text-s">
                                                SUB-TOTAL
                                              </td>
                                              <td className="text-right text-md">
                                                £6.9
                                              </td>
                                            </tr>
                                            <tr className="font-md">
                                              <td className="text-left font-md font-bold text-dark-gray py-5 px-1">
                                                DELIVERY
                                              </td>
                                              <td className="text-right py-5 px-1">
                                                £4.50
                                              </td>
                                            </tr>

                                            <tr
                                              className="w-full"
                                              style={{
                                                alignItems: 'center',
                                                width: '100%',
                                              }}
                                            >
                                              <td
                                                colSpan="2"
                                                className="w-full"
                                                style={{
                                                  borderBottom:
                                                    '2px solid #cccccc',
                                                  textAlign: 'center',
                                                  paddingLeft: '20px',
                                                  boxSizing: 'content-box',
                                                }}
                                              ></td>
                                            </tr>

                                            <tr className="font-md">
                                              <td className="text-left font-bold py-5 px-1">
                                                TOTAL
                                              </td>
                                              <td className="text-right font-bold py-5 px-1">
                                                £11.59
                                              </td>
                                            </tr>
                                          </table>
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
                                              background: 'white',
                                              padding: '0px 20px 20px 20px',
                                              fontWeight: 'bold',
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              width: '100%',
                                              boxSizing: 'border-box',
                                            }}
                                          >
                                            TOTAL
                                            <span
                                              style={{
                                                color: 'black',
                                                letterSpacing: '0.05em',
                                              }}
                                            >
                                              £11.59
                                            </span>
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
                                            <strong>PAYMENT DETAILS</strong>
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
                                              color: '#808080',
                                              fontSize: '14px',
                                            }}
                                          >
                                            <strong>PAYMENT TYPE</strong>
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{ padding: '0', margin: '0' }}
                                        >
                                          <div
                                            style={{
                                              background: '#ffffff',
                                              display: 'flex',
                                              gap: '0px 5px',
                                              padding: '20px 20px 30px 20px',
                                              alignItems: 'center',
                                            }}
                                          >
                                            <img
                                              src="https://img.icons8.com/color/48/paypal.png"
                                              style={{
                                                display: 'block',
                                                border: '1px solid #eee',
                                                outline: 'none',
                                                textDecoration: 'none',
                                                MsInterpolationMode: 'bicubic',
                                                width: '24px',
                                                height: '24px',
                                                objectFit: 'cover',
                                              }}
                                              alt=""
                                            />
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
                                              PayPal
                                            </p>
                                          </div>
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
                                            <strong>CHANGED YOUR MIND?</strong>
                                            <br />
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
                                              color: '#808080',
                                              fontSize: '14px',
                                            }}
                                          >
                                            <b>CANCELLING AN ORDER</b>
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
                                              color: '#808080',
                                              fontSize: '14px',
                                            }}
                                          >
                                            <br />
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
                                              color: '#808080',
                                              fontSize: '14px',
                                            }}
                                          >
                                            <span style={{ color: '#000000' }}>
                                              We’re not able to make changes to
                                              your order, but you do have the
                                              option to cancel it.{' '}
                                              <a
                                                href=""
                                                target="_blank"
                                                style={{
                                                  WebkitTextSizeAdjust: 'none',
                                                  MsTextSizeAdjust: 'none',
                                                  msoLineHeightRule: 'exactly',
                                                  textDecoration: 'underline',
                                                  color: '#000000',
                                                  fontSize: '14px',
                                                }}
                                              >
                                                Find out more
                                              </a>
                                            </span>
                                            <span style={{ color: '#000000' }}>
                                              . Go to your order from the button
                                              below and follow the instructions.
                                            </span>
                                            <br />
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            padding: '0px',
                                            margin: '0px',
                                          }}
                                        >
                                          <div
                                            style={{
                                              background: '#ffffff',
                                              display: 'flex',
                                              justifyContent: 'center',
                                              width: '100%',
                                              padding: '20px 0px',
                                            }}
                                          >
                                            <button
                                              style={{
                                                background: 'transparent',
                                                padding: '10px 0px',
                                                border: '2px solid #eee',
                                                fontWeight: '600',
                                                letterSpacing: '0.05em',
                                                width: '50%',
                                              }}
                                            >
                                              VIEW ORDER
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            padding: '0px',
                                            margin: '0px',
                                          }}
                                        >
                                          <div
                                            style={{ background: '#ffffff' }}
                                          ></div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
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
                                              color: '#808080',
                                              fontSize: '14px',
                                            }}
                                          >
                                            <b>RETURNING AN ORDER</b>
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
                                              color: '#808080',
                                              fontSize: '14px',
                                            }}
                                          >
                                            <br />
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
                                              color: '#808080',
                                              fontSize: '14px',
                                            }}
                                          >
                                            <span
                                              style={{ color: '#000000' }}
                                            ></span>
                                            You also have the option to return
                                            any unwanted items by Monday 15
                                            January 2024*. However, for hygiene
                                            reasons, there are some items that
                                            we can’t accept back and these will
                                            be sent back to you.
                                            <span
                                              style={{ color: '#000000' }}
                                            ></span>
                                            <br />
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{ padding: '0', margin: '0' }}
                                        >
                                          <div
                                            style={{
                                              background: '#ffffff',
                                              display: 'flex',
                                              justifyContent: 'center',
                                              width: '100%',
                                              padding: '20px 0px',
                                            }}
                                          >
                                            <button
                                              style={{
                                                background: 'transparent',
                                                padding: '10px 0px',
                                                border: '2px solid #eee',
                                                fontWeight: '600',
                                                letterSpacing: '0.05em',
                                                width: '50%',
                                              }}
                                            >
                                              RETURN INFORMATION
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{ padding: '0', margin: '0' }}
                                        >
                                          <div
                                            style={{ background: '#ffffff' }}
                                          ></div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          {/* here */}
                          <tr>
                            <td align="left" style={{ padding: 0, margin: 0 }}>
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
                                      padding: 0,
                                      margin: 0,
                                      width: '600px',
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
                                              msTextSizeAdjust: 'none',
                                              msoLineHeightRule: 'exactly',
                                              fontFamily:
                                                "arial, 'helvetica neue', helvetica, sans-serif",
                                              lineHeight: '18px',
                                              color: '#333333',
                                              fontSize: '12px',
                                            }}
                                          >
                                            Thanks,
                                          </p>
                                          <p
                                            style={{
                                              margin: '0',
                                              WebkitTextSizeAdjust: 'none',
                                              msTextSizeAdjust: 'none',
                                              msoLineHeightRule: 'exactly',
                                              fontFamily:
                                                "arial, 'helvetica neue', helvetica, sans-serif",
                                              lineHeight: '18px',
                                              color: '#333333',
                                              fontSize: '12px',
                                            }}
                                          >
                                            <strong>The GLAMO team</strong>
                                          </p>
                                        </td>
                                      </tr>

                                      <tr>
                                        <td
                                          style={{ padding: '0', margin: '0' }}
                                        >
                                          <div
                                            style={{
                                              background: '#dedfe4',
                                              padding: '20px',
                                            }}
                                          >
                                            <p
                                              style={{
                                                margin: '0',
                                                WebkitTextSizeAdjust: 'none',
                                                msTextSizeAdjust: 'none',
                                                msoLineHeightRule: 'exactly',
                                                fontFamily:
                                                  "arial, 'helvetica neue', helvetica, sans-serif",
                                                lineHeight: '21px',
                                                color: '#333333',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                letterSpacing: '0.05em',
                                              }}
                                            >
                                              ANY QUESTIONS?
                                            </p>
                                            <p
                                              style={{
                                                margin: '0',
                                                WebkitTextSizeAdjust: 'none',
                                                msTextSizeAdjust: 'none',
                                                msoLineHeightRule: 'exactly',
                                                fontFamily:
                                                  "arial, 'helvetica neue', helvetica, sans-serif",
                                                lineHeight: '21px',
                                                color: '#333333',
                                                fontSize: '14px',
                                              }}
                                            >
                                              For everything else you want to
                                              know…
                                            </p>
                                            <div
                                              className="top"
                                              style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: '0px 40px',
                                                paddingTop: '20px',
                                                marginBottom: '5px',
                                              }}
                                            >
                                              <div
                                                style={{
                                                  display: 'flex',
                                                  gap: '0px 5px',
                                                  alignItems: 'center',
                                                  flex: '1 1 0%',
                                                }}
                                              >
                                                <img
                                                  src="https://fbtskzl.stripocdn.email/content/guids/CABINET_b2c54c9f4f7a6a37ee9f194178460c55773a1f517775c0801028dbe0265558ca/images/icons8duplicate96.png"
                                                  style={{
                                                    display: 'block',
                                                    border: '0',
                                                    outline: 'none',
                                                    textDecoration: 'none',
                                                    MsInterpolationMode:
                                                      'bicubic',
                                                    width: '20px',
                                                    height: '20px',
                                                  }}
                                                  alt=""
                                                />
                                                <p
                                                  style={{
                                                    margin: '0',
                                                    WebkitTextSizeAdjust:
                                                      'none',
                                                    msTextSizeAdjust: 'none',
                                                    msoLineHeightRule:
                                                      'exactly',
                                                    fontFamily:
                                                      "arial, 'helvetica neue', helvetica, sans-serif",
                                                    lineHeight: '21px',
                                                    color: '#333333',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    textDecoration: 'underline',
                                                    textUnderlineOffset: '2px',
                                                  }}
                                                >
                                                  Payment, Promos & Gift
                                                  Vouchers
                                                </p>
                                              </div>
                                              <div
                                                style={{
                                                  display: 'flex',
                                                  gap: '0px 5px',
                                                  alignItems: 'center',
                                                  flex: '1 1 0%',
                                                }}
                                              >
                                                <img
                                                  src="https://fbtskzl.stripocdn.email/content/guids/CABINET_b2c54c9f4f7a6a37ee9f194178460c55773a1f517775c0801028dbe0265558ca/images/icons8duplicate96.png"
                                                  style={{
                                                    display: 'block',
                                                    border: '0',
                                                    outline: 'none',
                                                    textDecoration: 'none',
                                                    MsInterpolationMode:
                                                      'bicubic',
                                                    width: '20px',
                                                    height: '20px',
                                                  }}
                                                  alt=""
                                                />
                                                <p
                                                  style={{
                                                    margin: '0',
                                                    WebkitTextSizeAdjust:
                                                      'none',
                                                    msTextSizeAdjust: 'none',
                                                    msoLineHeightRule:
                                                      'exactly',
                                                    fontFamily:
                                                      "arial, 'helvetica neue', helvetica, sans-serif",
                                                    lineHeight: '21px',
                                                    color: '#333333',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    textDecoration: 'underline',
                                                    textUnderlineOffset: '2px',
                                                  }}
                                                >
                                                  Order issues
                                                </p>
                                              </div>
                                            </div>
                                            <div
                                              className="bottom"
                                              style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: '0px 40px',
                                                paddingBottom: '20px',
                                              }}
                                            >
                                              <div
                                                style={{
                                                  display: 'flex',
                                                  gap: '0px 5px',
                                                  alignItems: 'center',
                                                  flex: '1 1 0%',
                                                }}
                                              >
                                                <img
                                                  src="https://fbtskzl.stripocdn.email/content/guids/CABINET_b2c54c9f4f7a6a37ee9f194178460c55773a1f517775c0801028dbe0265558ca/images/icons8duplicate96.png"
                                                  style={{
                                                    display: 'block',
                                                    border: '0',
                                                    outline: 'none',
                                                    textDecoration: 'none',
                                                    MsInterpolationMode:
                                                      'bicubic',
                                                    width: '20px',
                                                    height: '20px',
                                                  }}
                                                  alt=""
                                                />
                                                <p
                                                  style={{
                                                    margin: '0',
                                                    WebkitTextSizeAdjust:
                                                      'none',
                                                    msTextSizeAdjust: 'none',
                                                    msoLineHeightRule:
                                                      'exactly',
                                                    fontFamily:
                                                      "arial, 'helvetica neue', helvetica, sans-serif",
                                                    lineHeight: '21px',
                                                    color: '#333333',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    textDecoration: 'underline',
                                                    textUnderlineOffset: '2px',
                                                  }}
                                                >
                                                  Delivery
                                                </p>
                                              </div>
                                              <div
                                                style={{
                                                  display: 'flex',
                                                  gap: '0px 5px',
                                                  alignItems: 'center',
                                                  flex: '1 1 0%',
                                                }}
                                              >
                                                <img
                                                  src="https://fbtskzl.stripocdn.email/content/guids/CABINET_b2c54c9f4f7a6a37ee9f194178460c55773a1f517775c0801028dbe0265558ca/images/icons8duplicate96.png"
                                                  style={{
                                                    display: 'block',
                                                    border: '0',
                                                    outline: 'none',
                                                    textDecoration: 'none',
                                                    MsInterpolationMode:
                                                      'bicubic',
                                                    width: '20px',
                                                    height: '20px',
                                                  }}
                                                  alt=""
                                                />
                                                <p
                                                  style={{
                                                    margin: '0',
                                                    WebkitTextSizeAdjust:
                                                      'none',
                                                    msTextSizeAdjust: 'none',
                                                    msoLineHeightRule:
                                                      'exactly',
                                                    fontFamily:
                                                      "arial, 'helvetica neue', helvetica, sans-serif",
                                                    lineHeight: '21px',
                                                    color: '#333333',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    textDecoration: 'underline',
                                                    textUnderlineOffset: '2px',
                                                  }}
                                                >
                                                  Customer Care1
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>

                                      <tr>
                                        <td
                                          style={{ padding: '0', margin: '0' }}
                                        >
                                          <section
                                            style={{
                                              background: '#2d2d2d',
                                              color: 'white',
                                              padding: '25px 20px 40px 20px',
                                            }}
                                          >
                                            <table
                                              style={{
                                                msoTableLspace: '0pt',
                                                msoTableRspace: '0pt',
                                                borderCollapse: 'collapse',
                                                borderSpacing: '0px',
                                                width: '100%',
                                              }}
                                            >
                                              <tr>
                                                <th
                                                  style={{
                                                    width: '50%',
                                                    alignItems: 'center',
                                                  }}
                                                >
                                                  Find inspiration
                                                </th>
                                                <th style={{ width: '50%' }}>
                                                  Get the app
                                                </th>
                                              </tr>
                                              <tr>
                                                <td
                                                  style={{
                                                    padding: '0',
                                                    margin: '10px 0px',
                                                    display: 'grid',
                                                    justifyContent: 'center',
                                                    gap: '0px 10px',
                                                    gridAutoFlow: 'column',
                                                  }}
                                                >
                                                  <span
                                                    className="instagram"
                                                    style={{
                                                      background:
                                                        'linear-gradient(115deg, #f9ce34, #ee2a7b, #6228d7)',
                                                      borderRadius: '50%',
                                                      width: '30px',
                                                      height: '30px',
                                                      display: 'flex',
                                                      justifyContent: 'center',
                                                      alignItems: 'center',
                                                    }}
                                                  >
                                                    <img
                                                      src="https://img.icons8.com/sf-regular/48/000000/instagram-new.png"
                                                      style={{
                                                        border: '0',
                                                        outline: 'none',
                                                        textDecoration: 'none',
                                                        MsInterpolationMode:
                                                          'bicubic',
                                                        filter: 'invert(100%)',
                                                        width: '80%',
                                                        height: '80%',
                                                      }}
                                                      alt=""
                                                    />
                                                  </span>
                                                  <span
                                                    className="twitter"
                                                    style={{
                                                      background: '#1da1f2',
                                                      borderRadius: '50%',
                                                      boxSizing: 'border-box',
                                                      height: '30px',
                                                      width: '30px',
                                                      display: 'flex',
                                                      justifyContent: 'center',
                                                      alignItems: 'center',
                                                    }}
                                                  >
                                                    <img
                                                      src="https://fbtskzl.stripocdn.email/content/guids/CABINET_b2c54c9f4f7a6a37ee9f194178460c55773a1f517775c0801028dbe0265558ca/images/icons8twitter50.png"
                                                      style={{
                                                        display: 'block',
                                                        border: '0',
                                                        outline: 'none',
                                                        textDecoration: 'none',
                                                        MsInterpolationMode:
                                                          'bicubic',
                                                        filter: 'invert(100%)',
                                                        width: '60%',
                                                        height: '60%',
                                                      }}
                                                      alt=""
                                                    />
                                                  </span>
                                                  <img
                                                    src="https://fbtskzl.stripocdn.email/content/guids/CABINET_b2c54c9f4f7a6a37ee9f194178460c55773a1f517775c0801028dbe0265558ca/images/icons8pinterest48.png"
                                                    style={{
                                                      display: 'block',
                                                      border: '0',
                                                      outline: 'none',
                                                      textDecoration: 'none',
                                                      MsInterpolationMode:
                                                        'bicubic',
                                                      width: '30px',
                                                      height: '30px',
                                                    }}
                                                    alt=""
                                                  />
                                                  <span
                                                    style={{
                                                      background: '#eee',
                                                      borderRadius: '50%',
                                                      width: '30px',
                                                      height: '30px',
                                                      display: 'flex',
                                                      justifyContent: 'center',
                                                      alignItems: 'center',
                                                    }}
                                                  >
                                                    <img
                                                      src="https://fbtskzl.stripocdn.email/content/guids/CABINET_b2c54c9f4f7a6a37ee9f194178460c55773a1f517775c0801028dbe0265558ca/images/icons8tiktok48.png"
                                                      style={{
                                                        display: 'block',
                                                        border: '0',
                                                        outline: 'none',
                                                        textDecoration: 'none',
                                                        MsInterpolationMode:
                                                          'bicubic',
                                                        width: '80%',
                                                        height: '80%',
                                                      }}
                                                      alt=""
                                                    />
                                                  </span>
                                                  <img
                                                    src="https://fbtskzl.stripocdn.email/content/guids/CABINET_b2c54c9f4f7a6a37ee9f194178460c55773a1f517775c0801028dbe0265558ca/images/icons8facebook48_1.png"
                                                    alt="facebook-new"
                                                    style={{
                                                      display: 'block',
                                                      border: '0',
                                                      outline: 'none',
                                                      textDecoration: 'none',
                                                      MsInterpolationMode:
                                                        'bicubic',
                                                      width: '30px',
                                                      height: '30px',
                                                    }}
                                                  />
                                                </td>
                                                <td
                                                  style={{
                                                    padding: '0',
                                                    margin: '0',
                                                  }}
                                                >
                                                  <div
                                                    style={{
                                                      display: 'flex',
                                                      flexDirection: 'row',
                                                      gap: '5px',
                                                      justifyContent: 'center',
                                                    }}
                                                  >
                                                    <img
                                                      src="https://fbtskzl.stripocdn.email/content/guids/CABINET_b2c54c9f4f7a6a37ee9f194178460c55773a1f517775c0801028dbe0265558ca/images/5a902dbf7f96951c82922875_prA.png"
                                                      style={{
                                                        display: 'block',
                                                        border: '0',
                                                        outline: 'none',
                                                        textDecoration: 'none',
                                                        MsInterpolationMode:
                                                          'bicubic',
                                                        width: '100px',
                                                        height: '28px',
                                                      }}
                                                      alt=""
                                                    />
                                                    <img
                                                      src="https://fbtskzl.stripocdn.email/content/guids/CABINET_b2c54c9f4f7a6a37ee9f194178460c55773a1f517775c0801028dbe0265558ca/images/5a902db97f96951c82922874_1_XT1.png"
                                                      style={{
                                                        display: 'block',
                                                        border: '0',
                                                        outline: 'none',
                                                        textDecoration: 'none',
                                                        MsInterpolationMode:
                                                          'bicubic',
                                                        width: '100px',
                                                        height: '28px',
                                                      }}
                                                      alt=""
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </section>
                                        </td>
                                      </tr>

                                      <tr>
                                        <td
                                          style={{
                                            padding: '0',
                                            margin: '0',
                                            paddingLeft: '20px',
                                            paddingRight: '20px',
                                            paddingBottom: '30px',
                                            backgroundColor: '#2d2d2d',
                                          }}
                                        >
                                          <p
                                            style={{
                                              margin: '0',
                                              WebkitTextSizeAdjust: 'none',
                                              MsTextSizeAdjust: 'none',
                                              msoLineHeightRule: 'exactly',
                                              fontFamily:
                                                "arial, 'helvetica neue', helvetica, sans-serif",
                                              lineHeight: '22px',
                                              color: '#efefef',
                                              fontSize: '11px',
                                            }}
                                          >
                                            *GLAMO has estimated this date on
                                            the basis of your expected delivery
                                            date and the refunds window
                                            applicable to your jurisdiction.
                                            Please see website{' '}
                                            <a
                                              href=""
                                              target="_blank"
                                              style={{
                                                WebkitTextSizeAdjust: 'none',
                                                MsTextSizeAdjust: 'none',
                                                msoLineHeightRule: 'exactly',
                                                textDecoration: 'none',
                                                color: '#efefef',
                                                fontSize: '11px',
                                              }}
                                            >
                                              T&amp;Cs
                                            </a>{' '}
                                            for more details on returns and
                                            refunds, and for the refunds window
                                            applicable to your jurisdiction.
                                            This inbox is not attended, so
                                            please don’t reply to this email.
                                            This is a service email. You will
                                            receive these no matter what your
                                            marketing communication preferences
                                            are. We’ll always keep your data
                                            safe and secure.{' '}
                                            <a
                                              href=""
                                              target="_blank"
                                              style={{
                                                WebkitTextSizeAdjust: 'none',
                                                MsTextSizeAdjust: 'none',
                                                msoLineHeightRule: 'exactly',
                                                textDecoration: 'none',
                                                color: '#efefef',
                                                fontSize: '11px',
                                              }}
                                            >
                                              Click here
                                            </a>{' '}
                                            to know why we need it and how we
                                            use it.&nbsp;
                                          </p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
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
