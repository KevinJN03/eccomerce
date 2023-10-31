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
// import dataMen from '../ProductScrape/temporaryDataMen.js';
// import dataWomen from '../ProductScrape/temporaryDataWomen.js';
import dataMen from '../ProductScrape/temporyDataMen.json' assert { type: 'json' };
import dataWomen from '../ProductScrape/temporyDataWomen.json' assert { type: 'json' };
import Coupon from '../Models/coupon.js';
import createDeliveryProfile from './createDeliveryProfiles.js';
import Product from '../Models/product.js';
import Category from '../Models/Category.js';

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
    const categoryMap = await createBulkCategories();

    const deliveryProfiles = await createDeliveryProfile();

    const menProductResult = await createProduct(
      dataMen,
      'men',
      categoryMap,
      deliveryProfiles,
    );
    const womenProductResult = await createProduct(
      dataWomen,
      'women',
      categoryMap,
      deliveryProfiles,
    );

    const productResult = menProductResult.concat(womenProductResult);

    // console.log(productResult);

    await Product.insertMany(productResult);
    const bulkCategoryArray = [];
    for (const [key, value] of categoryMap.entries()) {
      bulkCategoryArray.push(value);
    }

    console.log({ bulkCategoryArray });

    await Category.insertMany(bulkCategoryArray);

    await Coupon.insertMany(
      { code: 'SUPRISE', amount: 10 },
      { code: 'NEW', amount: 15 },
    );
    mongoose.connection.close();
    console.log('connection closed');
  } catch (error) {
    console.log(`ERROR at Populate${error}`);
  }
}
populate();

export default populate;
