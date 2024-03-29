/* eslint-disable no-restricted-syntax */

import 'dotenv/config.js';

import sharpify from '../Upload/sharpify.js';

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

  const newStock = JSON.parse(stock.replace(/&quot;/g, '"'));
  const newPrice = JSON.parse(price.replace(/&quot;/g, '"'));
  const parseVariations = variations?.map((item) => {
    const data = JSON.parse(item);
    delete data.id;
    data.options = new Map(data.options);

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
  if (newStock.on) {
    productData.stock = newStock.value;
  }

  if (newPrice.on) {
    productData.price = { current: newPrice.value };
  }

  const sharpResult = [];
  for (const item of files) {
    const sharpen = await sharpify(item);
    sharpen.fileName = counter;
    imageArr.push(`${url}/${id}/${sharpen.fileName}.${sharpen.format}`);
    counter += 1;
    sharpResult.push(sharpen);
  }

  return { productData, sharpResult };
}

export default generateProduct;
