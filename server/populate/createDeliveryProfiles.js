import DeliveryProfile from '../Models/deliveryProfile.js';

export default async function createDeliveryProfile() {
  const freeShipping = {
    name: 'Free Shipping',
    cost: 0,
    processingTime: {
      type: 'days',
      start: 3,
      end: 5,
    },
  };

  const standardShipping = {
    name: 'Standard Shipping',
    cost: 2.99,
    processingTime: {
      type: 'days',
      start: 2,
      end: 4,
    },
  };

  const expressShipping = {
    name: 'Express Shipping',
    cost: 4.99,
    processingTime: {
      type: 'days',
      start: 1,
      end: 2,
    },
  };

  const profileArray = [freeShipping, standardShipping, expressShipping];
  const result = await DeliveryProfile.insertMany(profileArray, {
    ordered: true,
  });

  const idArr = [];
  result.map((item) => {
    idArr.push(item._id);
  });
  return idArr;
}
