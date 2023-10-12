import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
const s3Upload = async (files, isProfile, folderId = uuidv4()) => {
  // console.log("file:", file)
  let counter = 0;
  const params = files.map((file) => {
    const result = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: isProfile
        ? `user/${file.id}.${file.format}`
        : `products/${folderId}/${file.fileName}.${file.format}`,
      Body: file.buffer,

      ContentDisposition: 'inline',
      ContentType: 'image/png',
      ResponseCacheControl: 'no-cache',
      CacheControl: 'no-cache',
    };

    counter += 1;
    return result;
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

export const s3Delete = async (id) => {
  const client = new S3Client({});
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: `products/${id}`,
  };
  const listCommand = new ListObjectsCommand(params);
  const response = await client.send(listCommand);
  if (!response.Contents) return;
  const listParams = response.Contents.map(({ Key }) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
    };
  });

  console.log(listParams);

  const result = await Promise.all(
    listParams.map((param) => {
      const deleteCommand = new DeleteObjectCommand(param);
      return client.send(deleteCommand);
    }),
  );
};
export default s3Upload;
