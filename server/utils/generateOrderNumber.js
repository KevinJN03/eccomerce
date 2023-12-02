import randomstring from 'randomstring';

export default function generateOrderNumber() {
  const orderNumberString = randomstring.generate({
    length: 12,
    charset: 'alphanumeric',
    capitalization: 'uppercase',
  });
  return orderNumberString;
}
