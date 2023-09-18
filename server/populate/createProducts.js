/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
import Product from '../Models/product.js';
import mongoose from 'mongoose';
async function createProduct(data, gender, categoryList) {
  try {
    const { categoryResults } = data;
    // console.log(categoryResults);

    //create a product and pass the id from the parameter to the product category;
    const newCategoryResult = categoryResults.map(async (data) => {
      const category = data.category.toLowerCase();
    
      return data.products.map(async (product) => {
        // console.log(category);
        // return [category, product.title];
        const findCategory = await categoryList.find(
          (cat) => cat.name == category,
        );

        const newProduct = await Product.create({
          title: product.title,
          images: product.images,
          price: product.price,
          gender,
          size: product.totalSize,
          detail: product.detail,
          color: [product.color],
          category: findCategory._id,
        });

        await findCategory[`${gender}`].push(newProduct._id);
        // console.log('newProduct: ', newProduct);
        return newProduct;
      });
    });

    const promiseResult = await Promise.all(
      newCategoryResult.map(async (result) => {
        const resultArr = Array.from(await result);
        return Promise.all(
          resultArr.map(async (item) => {
            return item;
          }),
        );
      }),
    ).then(async () => {
      const saveCategories = await Promise.all(
        categoryList.map(async (category) => {
          await category.save();
          return category;
        }),
      );

      return saveCategories;
    });
  console.log(promiseResult)
  } catch (error) {
    console.log(`ERROR AT createProduct: ${error}`);
  }
}

export default createProduct;
