import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command as ListObjectsCommand,
  DeleteObjectCommand,
  GetObjectCommand,
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

export const s3Delete = async (prefix, id) => {
  const client = new S3Client({});
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: `${prefix}/${id}`,
  };
  const listCommand = new ListObjectsCommand(params);
  const response = await client.send(listCommand);
  if (!response.Contents) return 'empty response Content or Keys';

  const listParams = response.Contents.map(({ Key }) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
    };
  });

  const result = await Promise.all(
    listParams.map((param) => {
      const deleteCommand = new DeleteObjectCommand(param);
      return client.send(deleteCommand);
    }),
  );
  return result;
};

export const s3Get = async (id) => {
  const client = new S3Client();
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: `products/${id}`,
  };
  const listCommand = new ListObjectsCommand(params);
  const response = await client.send(listCommand);
  if (!response?.Contents > 0) return;

  const keys = response.Contents.map((item) => item.Key);

  const result = await Promise.all(
    keys.map((item) => {
      const newParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: item,
      };

      const getCommand = new GetObjectCommand(newParams);
      const getResponse = client.send(getCommand);

      return getResponse;
    }),
  );
  console.log(result);
  return result;
};
export default s3Upload;
