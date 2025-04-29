import asyncHandler from 'express-async-handler';
import variationOption from '../Models/variationOption';

export const find_variation_option = asyncHandler(async (req, res, next) => {
  const { product_id, _id, variation_id, variation, variation2 } = req.body;

  const query = {
    variation_id,
    product_id,
    variation,
  };

  if (variation2) {
    query.variation2 = variation2;
  }
  const findOption = await variationOption.findOne(query);

  res.send(findOption);
});
