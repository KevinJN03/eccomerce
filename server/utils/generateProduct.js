/* eslint-disable no-restricted-syntax */

import 'dotenv/config.js';

import sharpify from '../Upload/sharpify.js';
import _ from 'lodash';
import VariationOption from '../Models/variationOption.js';
import mongoose from 'mongoose';

async function generateProduct(req, id, endPoint = 'products') {
  const url = `${process.env.CLOUDFRONT_URL}/${endPoint}`;
  let counter = 1;
  const imageArr = [];
  const { files } = req;

  const { variations } = req.body;

  const {
    title,
    delivery,
    gender,
    price,
    stock,
    category,

    description,
  } = req.body;

  const newVariationsArray = [];
  if (variations?.length == 3) {
    // only process combined variation
    newVariationsArray.push(variations[2]);
  } else {
    newVariationsArray.push(...variations);
  }

  const variationOptionsArray = [];
  const parseVariations = newVariationsArray.map((item) => {
    const data = JSON.parse(item);
    delete data.id;
    data._id = new mongoose.Types.ObjectId();
    //data.options = new Map(data.options);

    const newOptions = data?.options.map(
      ([_id, { _id: objectId, ...object }]) => ({
        ...object,
        variation_id: data._id,
        option_id: object.id,
        product_id: id,
      }),
    );
    variationOptionsArray.push(...newOptions);
    return data;
  });

  const productData = {
    title,
    delivery,
    gender,
    category,

    variations: parseVariations,
    images: imageArr,
    description,
  };
  productData.stock = _.isNaN(stock) ? null : stock;
  _.set(productData, 'price.current', _.isNaN(price) ? null : price);

  const sharpResult = [];
  for (const item of files) {
    const sharpen = await sharpify(item);
    sharpen.fileName = counter;
    imageArr.push(
      `${url}/${id.toString()}/${sharpen.fileName}.${sharpen.format}`,
    );
    counter += 1;
    sharpResult.push(sharpen);
  }

  return { productData, sharpResult, variationOptionsArray };
}

export default generateProduct;
