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
    const createCategory = arr.map((name) => {
      const newCategory = new Category({
        name: name,
      });
      return newCategory;
    });

    // const result = await Category.insertMany(createCategory, { ordered: true });
    // const result = await Category.insertMany(createCategory, { ordered: true });

    const result = createCategory;
    const categoryMap = new Map();
    // const promiseArr = await Promise.all(createCategory);
    result.map((item) => {
      if (!categoryMap.has(item.name)) {
        categoryMap.set(item.name, {
          _id: item._id,
          id: item.id,
          men: [],
          women: [],
          name: item.name,
        });
      }
    });
   
    return categoryMap;
  } catch (error) {
    console.log('error', error);
  }
}
