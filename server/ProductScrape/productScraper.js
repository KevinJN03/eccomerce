/* eslint-disable */
import puppeteer from 'puppeteer';
import ScrapeIndividual from './individualPageScrape.js';
// const productUrl = 'https://www.asos.com/men/jeans/cat/?cid=4208';

// // const productUrl =
// //   'https://www.asos.com/asos-design/asos-design-classic-rigid-jeans-in-dark-wash/prd/204949481?clr=dark-wash-blue&colourWayId=204949483&cid=4208';

export default async function getProductData(category, productUrl) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  await page.goto(productUrl, {
    timeout: 0,
  });

  const allProducts = await page.waitForSelector('.listingPage_HfNlp');

  const products = await allProducts.evaluate((section) => {
    const productUrl = Array.from(
      document.querySelectorAll('.productLink_c18pi'),
      (el) => el.href,
    );
    return productUrl;
  });

  const results = { category, products: [] };
  for (let i = 0; i < 2; i++) {
    await page.goto(products[i], { timeout: 0 });
    
    const productInfo = await ScrapeIndividual(page);
    results.products.push(productInfo);
  }

  await browser.close();
  return await results;
}
