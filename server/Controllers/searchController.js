/* eslint-disable import/prefer-default-export */
import asyncHandler from 'express-async-handler';
import Product from '../Models/product.js';

export const search_product = asyncHandler(async (req, res, next) => {
  const { q } = req.query;
  const searchResult = await Product.aggregate([
    {
      $search: {
        index: 'default',
        autocomplete: {
          query: q,
          path: 'title',
          fuzzy: {
            maxEdits: 2,
          },
        },
      },
    },
    {
      $project: {
        title: 1,
        images: 1,
      },
    },
    {
      $limit: 10,
    },

    // {
    //   $limit: 5,
    // },
  ]);

  res.send(searchResult);
});
