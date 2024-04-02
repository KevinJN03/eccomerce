import asyncHandler from 'express-async-handler';

import DeliveryProfile from '../Models/deliveryProfile.js';
import Order from '../Models/order.js';
import { useParams } from 'react-router-dom';
import deliveryProfileValidator, {
  postCodeValidator,
} from '../utils/deliveryProfileValidator.js';
import { check, validationResult } from 'express-validator';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';
import _ from 'lodash';
import mongoose from 'mongoose';
const errorFormatter = (element) => {
  try {
    const parseValue = JSON.parse(element.msg);

    return parseValue;
  } catch (error) {
    return element.msg;
  }
};
export const create_delivery_profile = [
  deliveryProfileValidator,
  check('name').custom(async (value) => {
    const find = await DeliveryProfile.findOne({ name: value });

    if (find) {
      throw Error('You already have a profile with this name.');
    }

    return true;
  }),
  asyncHandler(async (req, res, next) => {
    const { _id, ...body } = req.body;
    //console.log(body);

    const errors = validationResult(req).formatWith(errorFormatter);
    // console.log('- - - - - - - - - - - ');

    // console.log(errors.mapped());
    if (!errors.isEmpty()) {
      res.status(404).send(errors.mapped());
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

export const get_delivery_profile_pagination = [
  check('limit').trim().toInt(),
  check('page').trim().toInt(),

  asyncHandler(async (req, res, next) => {
    const { page, limit } = req.query;

    const [totalProfiles, profiles] = await Promise.all([
      DeliveryProfile.countDocuments(),

      DeliveryProfile.aggregate([
        {
          $sort: { _id: 1 },
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
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
      ]),
    ]);

    res.status(200).send({ total: totalProfiles, profiles });
  }),
];

export const delete_single_delivery_profile = asyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    const profile = await DeliveryProfile.findByIdAndDelete(id);
    res.status(200).send(profile);
  },
);

export const update_single_delivery_profile = [
  deliveryProfileValidator,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
      res.status(404).send(errors.mapped());
      return;
    }

    const profile = await DeliveryProfile.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      },
    );

    res.status(200).send(profile);
  }),
];

export const update_delivery_profile = [
  // postCodeValidator(),
  check('origin_post_code', 'Enter a valid postal code')
    .escape()
    .trim()
    .notEmpty(),
  asyncHandler(async (req, res, next) => {
    const { ids, ...body } = req.body;

    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
      res.status(404).send(errors.mapped());
      return;
    }

    const profiles = await DeliveryProfile.find({ _id: ids }, null, {
      new: true,
      lean: { toObject: true },
    });
    const failure = [];
    const updateProfile = profiles.map(({ country_of_origin, _id, name }) => {
      try {
        if (
          postcodeValidatorExistsForCountry(country_of_origin) &&
          !postcodeValidator(
            req.body?.origin_post_code?.toUpperCase(),
            country_of_origin,
          )
        ) {
          failure.push({ name, _id, country_of_origin });
        } else {
          return DeliveryProfile.updateOne({ _id }, req.body);
        }
      } catch (error) {
        console.error('validating error here: ', error);
      }
    });
    await Promise.allSettled(updateProfile);
    if (failure.length >= 1) {
      res.status(500).send({
        failure,
        msg: `We're unable to update the origin post code to ${req.body.origin_post_code} for ${failure.length} of your delivery profiles. Try again or update each profile individually.`,
      });
      return;
    }
    res.status(200).send({
      msg: `The origin post code has been updated to ${
        req.body.origin_post_code
      } for ${profiles.length - failure.length} of your delivery profiles.`,
    });
  }),
];

export const get_single_delivery_profile = asyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    const profiles = await DeliveryProfile.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
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
          as: 'listings', // Output field to store the matching listings
        },
      },
      {
        $addFields: {
          active_listings: { $size: '$listings' },
        },
      },
    ]);
    res.status(200).send(profiles);
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
