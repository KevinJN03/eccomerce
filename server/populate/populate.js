/* eslint-disable no-underscore-dangle */
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dropCollection from './dropCollection.js';
import createMainSubCategory from './createMain_SubCategory.js';
import getProductData from '../ProductScrape/productScraper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const { DBNAME, URL } = process.env;

const populate = async () => {
  mongoose.connect(URL, { dbName: DBNAME }).catch((error) => {
    console.log(`error: ${error}`);
  });

  dropCollection(mongoose);
  const productData = await getProductData();
  console.log(productData[0].size);
  createMainSubCategory().then(() => {
    mongoose.connection.close();
    console.log('connection closed');
  });
};
populate();

export default populate;
