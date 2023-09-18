/* eslint-disable no-underscore-dangle */
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dropCollection from './dropCollection.js';
import createMainSubCategory from './createMain_SubCategory.js';
import getProductData from '../ProductScrape/productScraper.js';
import createBulkCategories from './createBulkCategories.js';
import createProduct from './createProducts.js';
import dataMen from '../ProductScrape/temporaryDataMen.js';
import dataWomen from '../ProductScrape/temporaryDataWomen.js';
import Coupon from '../Models/coupon.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const { DBNAME, URL } = process.env;

async function populate() {
  try {
    await mongoose.connect(URL, { dbName: DBNAME }).catch((error) => {
      console.log(`error: ${error}`);
    });
    await dropCollection(mongoose);
    const categories = await createBulkCategories();
    await createProduct(dataMen, 'men', categories);
    await createProduct(dataWomen, 'women', categories);
    await Coupon.create({ code: 'SUPRISE', amount: 10 });
    mongoose.connection.close();
    console.log('connection closed');
  } catch (error) {
    console.log(`ERROR at Populate${error}`);
  }
}
populate();

export default populate;
