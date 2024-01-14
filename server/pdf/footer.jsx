import React, { useEffect, useState } from 'react';
import { Text, View, Image } from '@react-pdf/renderer';

import 'dotenv/config';
import coupon from '../Models/coupon';

const { CLOUDFRONT_URL } = process.env;
function Footer({ checks }) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'col',
        flexWrap: 'nowrap',
        // alignContent: 'center',

        position: 'absolute',
        marginTop: '10pt',

        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {checks?.coupon && (
        <View
          id="top"
          style={{
            paddingVertical: '12pt',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
            borderTop: '1pt solid black',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              height: '100%',
              alignItems: 'baseline',
              gap: '10pt',
            }}
          >
            <View
              style={{
                position: 'relative',
                width: '120pt',
                height: '41pt',
                // maxWidth: '120pt',
                // maxHeight: '40pt',
                borderTop: '1pt solid black',
              }}
            >
              <Image
                src={`${CLOUDFRONT_URL}/files/logos/zigzagbox.png`}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,

                  zIndex: '2',
                  width: '120pt',
                  height: '41pt',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: '12pt',
                    fontWeight: 'semibold',
                  }}
                >
                  {`${checks.coupon?.type == 'fixed' ? '£' : ''}${
                    checks.coupon?.amount
                  }${checks.coupon?.type != 'fixed' ? '%' : ''} OFF`}
                </Text>
              </View>
            </View>

            <Text style={{ alignSelf: 'baseline', paddingBottom: '5pt' }}>
              Enter this coupon code at checkout: {checks.coupon?.code}
            </Text>
          </View>
        </View>
      )}
      <View
        id="bottom"
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          height: '60pt',
          alignContent: 'center',
          borderTop: '1pt solid black',
          paddingTop: '12pt',
          marginBottom: '12pt',
        }}
      >
        <View id="left" style={{ height: '100%' }}>
          <Image
            src={`${CLOUDFRONT_URL}/files/logos/glamo-black-logo.png`}
            style={{
              // maxWidth: '60pt',
              // maxHeight: '50pt',
              width: '60pt',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </View>
        <View
          id="middle"
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: '16pt',
            paddingLeft: '60pt',
          }}
        >
          <Image
            src={`${CLOUDFRONT_URL}/files/logos/paper-plane.png`}
            style={{ width: '35pt', height: '35pt' }}
          />
          <View style={{ maxWidth: '200pt', fontSize: '8pt' }}>
            <Text style={{ fontWeight: 'semibold' }}>Do the green thing</Text>
            <Text>
              Reuse this paper to make origami, confetti or your next to-do
              list.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Footer;
