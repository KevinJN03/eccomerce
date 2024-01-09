import muhammara, {
  PDFWStreamForBuffer,
  PDFRStreamForBuffer,
  recrypt,
  Recipe,
} from 'muhammara';
import { Readable } from 'stream';
export default async function encryptPdf(buffer, passwordOptions) {
  try {
    const readStream = new PDFRStreamForBuffer(buffer);

    const writeStream = new PDFWStreamForBuffer();

    recrypt(readStream, writeStream, passwordOptions);
    return writeStream.buffer;
  } catch (error) {
    console.error(error);
    return false;
  }
}
