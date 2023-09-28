import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
const s3Upload = async (files, type) => {
  // console.log("file:", file)
  const newFolderId = uuidv4();

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key:
        type === 'profile'
          ? `user/${file.id}.${file.format}`
          : `uploads/${newFolderId}/${file.originalname}`,
      Body: file.buffer,

      ContentDisposition: 'inline',
      ContentType: file.type,
    };
  });
  const s3Client = new S3Client();

  //   const result = await s3Client.send(command);

  const results = await Promise.all(
    params.map((param) => {
      const command = new PutObjectCommand(param);
      return s3Client.send(command);
    }),
  );
  return results;
};
export default s3Upload;
