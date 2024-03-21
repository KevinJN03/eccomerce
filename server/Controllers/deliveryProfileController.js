import asyncHandler from 'express-async-handler';

import DeliveryProfile from '../Models/deliveryProfile.js';
import Order from '../Models/order.js';
import { useParams } from 'react-router-dom';
import deliveryProfileValidator from '../utils/deliveryProfileValidator.js';
import { validationResult } from 'express-validator';

export const create_delivery_profile = [
  deliveryProfileValidator,
  asyncHandler(async (req, res, next) => {
    const { _id, ...body } = req.body;
    //console.log(body);

    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
      res.status(404).send({ error: errors.mapped() });
      return;
    }
    const profile = await DeliveryProfile.create(body);
    res.status(201).send(profile);
  }),
];

export const get_all_delivery_profile = asyncHandler(async (req, res, next) => {
  const profiles = await DeliveryProfile.aggregate([
    {
      $lookup: {
        from: 'products', // Assuming your listings collection is named "listings"
        localField: '_id',
        foreignField: 'delivery',
        // let: { deliveryId: '$_delivery' }, // Assigning the delivery profile ID to a variable
        pipeline: [
          {
            $project: { _id: 1, title: 1 },
          },
        ],
        as: 'activeListings', // Output field to store the matching listings
      },
    },
    {
      $addFields: {
        active_listings: { $size: '$activeListings' },
      },
    },

    {
      $sort: { _id: 1 },
    },
  ]);

  res.status(200).send(profiles);
});
export const delete_single_delivery_profile = asyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    const profile = await DeliveryProfile.findByIdAndDelete(id);
    res.status(200).send(profile);
  },
);

export const update_single_delivery_profile = asyncHandler(
  async (req, res, next) => {
    const { id } = req.params;

    const profile = await DeliveryProfile.updateOne({ _id: id }, req.body, {
      new: true,
      // context: 'query',
    });

    res.status(200).send(profile);
  },
);

export const update_delivery_profile = asyncHandler(async (req, res, next) => {
  const { ids, ...body } = req.body;

  const profiles = await DeliveryProfile.updateMany({ _id: ids }, body, {
    new: true,
  });

  res.status(200).send(profiles);
});

export const get_single_delivery_profile = asyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    const profile = await DeliveryProfile.find({ _id: id });

    res.status(200).send(profile);
  },
);

export const get_many_delivery_profile = asyncHandler(
  async (req, res, next) => {
    const { id } = req.params;

    const parseIdToArray = JSON.parse(id);

    const profiles = await DeliveryProfile.find({ _id: parseIdToArray });

    res.status(200).send(profiles);
  },
);

export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({}, null, {
    populate: { path: 'items.product' },
    sort: { createdAt: '-1' },
  });

  return res.status(200).send({ succes: true, orders });
});
