import 'dotenv/config';
import crypto from 'crypto';
import Cryptr from 'cryptr';

const { ENCRYPTION_KEY, ENCRYPTION_ALGORITHM } = process.env;
const cryptr = new Cryptr(ENCRYPTION_KEY);

function encrypt(text) {
  const encryptedText = cryptr.encrypt(text);
  return encryptedText;
}

function decrypt(encryptedText) {
  const decryptedText = cryptr.decrypt(encryptedText);
  return decryptedText;
}


function hashCode(code) {

  return crypto.createHash('sha256').update(code).digest('hex')

}
export { encrypt, decrypt, hashCode };
