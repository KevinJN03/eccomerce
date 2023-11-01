/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
import Product from '../Models/product.js';
import mongoose from 'mongoose';
async function createProduct(data, gender, categoryMap, deliveryProfiles) {
  try {
    const allProducts = [];
    const { categoryResults } = data;
    // console.log(categoryResults);

    //create a product and pass the id from the parameter to the product category;
    const newCategoryResult = categoryResults.map(async (data) => {
      const category = data.category.toLowerCase();

      return data.products.map(async (product) => {
        const { title, images, price, detail, variations, stock } = product;

        const newVariations = variations?.map((item) => {
          const newItem = { ...item };
          const newOptions = new Map(newItem?.options);
          newItem.options = newOptions;
          return newItem;
        });
        // console.log(category);
        // return [category, product.title]

        const newProduct = new Product({
          title,
          images,
          price,
          gender,
          stock,
          // size: product.totalSize,
          detail,
          // color: [product.color],
          category: categoryMap.get(category).id,
          delivery: deliveryProfiles,
          variations: newVariations,
        });

        allProducts.push(newProduct);

        // await findCategory[gender].push(newProduct._id);
        const getCategory = categoryMap.get(category);

        const getCategoryGenderArray = getCategory[gender];
        getCategoryGenderArray.push(newProduct._id);
        // const addProductToCategory = getCategoryGenderArray.push(
        //   newProduct._id,
        // );
        categoryMap.set(category, getCategory);
        // console.log('newProduct: ', newProduct);
        return newProduct;
      });
    });

    // const promiseResult = await Promise.all(
    //   newCategoryResult.map(async (result) => {
    //     const resultArr = Array.from(await result);
    //     return Promise.all(
    //       resultArr.map(async (item) => {
    //         return item;
    //       }),
    //     );
    //   }),
    // ).then(async () => {
    //   const saveCategories = await Promise.all(
    //     categoryList.map(async (category) => {
    //       await category.save();
    //       return category;
    //     }),
    //   );

    //   return saveCategories;
    // });
    // console.log(promiseResult);



  return allProducts
  } catch (error) {
    console.log(`ERROR AT createProduct: ${error}`);
  }
}

export default createProduct;
