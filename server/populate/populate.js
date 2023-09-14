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
    mongoose.connection.close();
    console.log('connection closed');
    // await Promise.all([menProducts, womenProducts]).then(async () => {
    //   await mongoose.connection.close();
    //   console.log('connection closed');
    // });

    // await createProduct(dataWomen, 'women', categories),
    // .then(async () => {
    //   await mongoose.connection.close();
    //   console.log('connection closed');
    // }),

    // console.log(products);
    // products.then(()=> mongoose.connection.close());
    // mongoose.connection.close();
    // await console.log('connection closed');
  } catch (error) {
    console.log(`ERROR at Populate${error}`);
  }

  // await dropCollection(mongoose);
  // const productData = await getProductData();
  // console.log(productData[0].size);

  // .then((result) => {
  //   createProduct(result);
  // });

  // await createProduct( await categories).then((result) => {
  //   console.log('resultList', result);
  //   mongoose.connection.close();
  //   console.log('connection closed');
  // });
}
populate();

export default populate;
