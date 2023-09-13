import mainCategory from '../Models/mainCategory.js';

export default async function createMainCategory(name) {
  const newCategory = mainCategory.create({ name });

  return newCategory;
}
