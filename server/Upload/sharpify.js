import { config } from 'dotenv';
import sharp from 'sharp';

const sharpify = async (file, type) => {
  const obj = {
    format: 'png',
    type: file.mimetype,
    originalname: file.originalname,
  };
  const image = sharp(file.buffer);
  // file size is bigger than 125 kb
  if (file.size / 1024 > 125) {
    const meta = await image.metadata();

    const compressImage = image.png({ quality: 90, force: true });
    obj.buffer = await compressImage.toBuffer();
    // type === 'profile' && compressImage.resize(200);
  } else if (file.mimetype !== 'image/png') {
    const compressImage = image.png({ quality: 100, force: true });
    obj.buffer = await compressImage.toBuffer();
  } else {
    obj.buffer = file.buffer;
  }

  return obj;
};

export default sharpify;
