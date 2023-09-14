import mainCategory from '../Models/mainCategory.js';
import Category from '../Models/Category.js';
import mongoose from 'mongoose';
export default async function createBulkCategories() {
  const arr = [
    'new in',
    'shoes',
    'clothing',
    'accessories',
    'sportswear',
    'summer',
    'brands',
    'topman',
    'marketplace',
    'outlet',
    'topshop',
  ];
  try {
    const createCategory = await arr.map(async (name) => {
      const newCategory = await Category.create({
        name,
      });
      return newCategory;
    });
    const promiseArr = await Promise.all(createCategory);
    return promiseArr;
  } catch (error) {
    console.log('error', error);
  }
}
