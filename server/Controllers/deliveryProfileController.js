import asyncHandler from 'express-async-handler';

import DeliveryProfile from '../Models/deliveryProfile.js';
import Order from '../Models/order.js';
import { useParams } from 'react-router-dom';

export const create_delivery_profile = asyncHandler(async (req, res, next) => {
  const body = req.body;
  const profile = await DeliveryProfile.create(body);
  res.status(201).send(profile);
});

export const get_all_delivery_profile = asyncHandler(async (req, res, next) => {
  const profile = await DeliveryProfile.find();
  res.status(200).send(profile);
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
      context: 'query',
    });

    res.status(200).send(profile);
  },
);

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

