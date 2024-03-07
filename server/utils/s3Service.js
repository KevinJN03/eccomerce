import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command as ListObjectsCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import 'dotenv/config';
const s3Client = new S3Client();

export const generateSignedUrl = async (filePath) => {
  const params = { Bucket: process.env.AWS_BUCKET_NAME, Key: filePath };
  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(s3Client, command);

  return url;
};
export const s3PdfUpload = async ({ pdfStream, fileName }) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `files/pdf/${fileName}`,
      Body: pdfStream,

      ContentType: 'application/pdf',
    };

    const parallelUploads3 = new Upload({
      client: s3Client,
      params,
    });

    parallelUploads3.on('httpUploadProgress', (progress) => {
      console.log(progress);
    });

    const response = await parallelUploads3.done();
    return response;
  } catch (error) {
    console.error('error at s3PdfUpload', error);
  }
};
const s3Upload = async ({ files, isProfile, folderId, endPoint }) => {
  console.log({endPoint})
  const params = files.map((file) => {
    const result = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: isProfile
        ? `${endPoint}/${file.id}.${file.format}`
        : `${endPoint}/${folderId}/${file.fileName}.${file.format}`,
      Body: file.buffer,

      ContentDisposition: 'inline',
      ContentType: 'image/png',
      ResponseCacheControl: 'no-cache',
      CacheControl: 'no-cache',
    };
    return result;
  });

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

  const listParams = [];
  response.Contents.forEach(({ Key }) => {
    if (Key !== `products/${id}/1.png`) {
      listParams.push({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key,
      });
    }
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
  try {
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
      keys.map(async (item) => {
        const newParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: item,
        };

        const getCommand = new GetObjectCommand(newParams);
        const getResponse = await client.send(getCommand);

        return {
          key: item.split('/')[2],
          data: getResponse,
        };
      }),
    );

    return result;
  } catch (error) {
    console.log('error: ', error);
  }
};
export default s3Upload;
