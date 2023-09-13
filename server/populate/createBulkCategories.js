import mainCategory from '../Models/mainCategory.js';
import category from '../Models/category.js';
export default async function createBulkCategories(currentCategory) {
  const arr = [
    'shoes',
    'clothing',
    'accessories',
    'sportswear',
    'summer',
    'brands',
    'topman',
    'marketplace',
    'outlet',
  ];
  try {
    const createCategory = arr.map(async (elem) => {
      const newCategory = await category.create({
        name: elem,
        gender: currentCategory.name,
        mainCategory: currentCategory.id,
      });
      return newCategory;
    });

    await Promise.all(
      createCategory.map(async (elem) => {
        const { id } = await elem;
        await mainCategory.findByIdAndUpdate(currentCategory.id, {
          $push: { categories: id },
        });
      }),
    ).catch((err) => console.log(err));
  } catch (error) {
    console.log('error', error);
  }
}
