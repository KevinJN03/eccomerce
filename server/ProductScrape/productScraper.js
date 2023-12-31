/* eslint-disable */
import puppeteer from 'puppeteer';
import ScrapeIndividual from './individualPageScrape.js';
// const productUrl = 'https://www.asos.com/men/jeans/cat/?cid=4208';

// // const productUrl =
// //   'https://www.asos.com/asos-design/asos-design-classic-rigid-jeans-in-dark-wash/prd/204949481?clr=dark-wash-blue&colourWayId=204949483&cid=4208';

export default async function getProductData(category, productUrl) {
  const browser = await puppeteer.launch({
    headless: false,
    // defaultViewport: false,
  });
  try {
    const page = await browser.newPage();
    // await page.setDefaultNavigationTimeout(0);

    await page.goto(productUrl, { waitUntil: 'domcontentloaded' });

    const allProducts = await page.waitForSelector('.listingPage_HfNlp');

    const products = await allProducts.evaluate(() => {
      const productUrl = Array.from(
        document.querySelectorAll('.listingPage_HfNlp > article >  a'),
        (el) => el.href,
      );

      console.log({ productUrl });
      return productUrl.slice(0, 2);
    });
    console.log('productLists: ', products);
    const results = { category, products: [] };
    const batch_size = 1;
    // for (let i = 0; i < products.length; i+= batch_size) {
    //   const batch = products.slice(i, i + batch_size)
    //   // const newSinglePage = await browser.newPage()
    //   // newSinglePage.setDefaultNavigationTimeout(0);
    //   // await newSinglePage.goto(batch[0], {timeout: 0, waitUntil: "domcontentloaded"});

    //   // const productInfo = await ScrapeIndividual(newSinglePage);
    //   const productInfo = await ScrapeIndividual(batch[0]);
    //   results.products.push(productInfo);
    // }

    // for (const item of products) {
    //   // const newSinglePage = await browser.newPage();
    //   // newSinglePage.setDefaultNavigationTimeout(0);
    //   // await newSinglePage.goto(item);
    //   const size = {
    //     name: 'Size',
    //     default: true,
    //     quantityHeader: { on: false },
    //     priceHeader: { on: false },
    //     combine: false,
    //     options: [],
    //   };
    //   const productInfo = await ScrapeIndividual(browser, item, size);
    //   results.products.push(productInfo);
    // }

    const scrapeProduct = await products.map(async (link) => {
      

      const newProductPage = await browser.newPage();
      newProductPage.setDefaultNavigationTimeout(0);
      newProductPage.goto(link, { waitUntil: 'domcontentloaded' });
      const productInfo = await ScrapeIndividual(newProductPage).then((res) => {
        newProductPage.close();
        return res
      });
      results.products.push(productInfo);

      return await productInfo;
    });

    const data = await Promise.all(scrapeProduct).then((res) => {
      browser.close();
      console.log('complete', { scrapeProduct });
      return results;
    });

    return data;
    // return  browser.close().then(()=> results);
  } catch (error) {
    console.log('error at getproductdata: ', error);
  }
}
