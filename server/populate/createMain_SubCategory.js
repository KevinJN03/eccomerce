import createMainCategory from './createMainCategory.js';
import createBulkCategories from './createBulkCategories.js';

export default async function createMainSubCategory() {
  try {
    const menCategory = await createMainCategory('men');
    const womenCategory = await createMainCategory('women');
    await createBulkCategories(menCategory);
    await createBulkCategories(womenCategory);
  } catch (error) {
    console.log('err at createMain&subCategory', error);
  }
}
