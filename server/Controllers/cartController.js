import Cart from '../Models/cart';

import asyncHandler from 'express-async-handler';

export const createCart = [
  asyncHandler(async (req, res, next) => {
    const cart = await Cart.create(req.body);
    console.log(cart);
    res.send({ msg: 'cart created successfully!', cart_id: cart._id });
  }),
];

export const updateCart = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });

    res.send(cart);
  }),
];

export const retrieveCart = [
  asyncHandler(async (req, res, next) => {
    const { id } = req.param;

    const cart = await Cart.findById(id);

    res.send(cart);
  }),
];
