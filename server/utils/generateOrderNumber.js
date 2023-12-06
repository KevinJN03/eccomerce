import randomstring from 'randomstring';

export default function generateOrderNumber() {
  const orderNumberString = randomstring.generate({
    length: 12,
    charset: 'alphanumeric',
    capitalization: 'uppercase',
  });

  console.log('orderNumberfromstring: ', orderNumberString)
  return orderNumberString;
}
