/* eslint-disable import/prefer-default-export */
import asyncHandler from 'express-async-handler';
import Product from '../Models/product.js';

export const search_product = asyncHandler(async (req, res, next) => {
  const { q } = req.query;
  const searchResult = await Product.aggregate([
    {
      $search: {
        index: 'default',
        text: {
          query: q,
          path: 'title',
        },
        highlight: {
          path: 'title',
        },
      },
    },
    {
      $project: {
        title: 1,
        score: {
          $meta: 'searchScore',
        },
        highlight: {
          $meta: 'searchHighlights',
        },
      },
    },
    // {
    //   $limit: 5,
    // },
  ]);

  res.send(searchResult);
});
