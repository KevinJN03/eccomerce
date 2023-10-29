import { config } from 'dotenv';
import sharp from 'sharp';

const sharpify = async (file, type) => {
  const image = sharp(file.buffer);
  const meta = await image.metadata();

  const { format } = meta;
  const config = {
    jpeg: { quality: 80 },
    webp: { quality: 100, lossless: true, effort: 6 },
    png: { compressionLevel: 8 },
  };
  // .resize(100)
  // .png({ quality: 80, force: true })
  // .webp({ quality: 80, force: false })
  // .jpeg({ quality: 80, force: false })
  // .toBuffer();

  const compressImage = image.png({ quality: 90, force: true });

  type === 'profile' && compressImage.resize(200);

  const obj = {
    buffer: await compressImage.toBuffer(),
    format: 'png',
    type: file.mimetype,
    originalname: file.originalname,
  };
  // console.log(obj);
  return obj;
};

export default sharpify;
