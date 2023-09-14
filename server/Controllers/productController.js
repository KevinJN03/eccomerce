import asyncHandler from 'express-async-handler';
import Product from '../Models/product.js';
import Category from '../Models/category.js';
// eslint-disable-next-line import/prefer-default-export

export const get_all_products = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// export const get_all_by_category = asyncHandler(async (req, res) => {
//   const category = await Category.find();

//   const products = await Product.find({ category });
//   if (category) {
//     res.send(category);
//   }
// });

export const get_single_product = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id });

  return res.send(product);
});
