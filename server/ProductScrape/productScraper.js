/* eslint-disable */
import puppeteer from 'puppeteer';
import ScrapeIndividual from './individualPageScrape.js';
// const productUrl = 'https://www.asos.com/men/jeans/cat/?cid=4208';

// // const productUrl =
// //   'https://www.asos.com/asos-design/asos-design-classic-rigid-jeans-in-dark-wash/prd/204949481?clr=dark-wash-blue&colourWayId=204949483&cid=4208';

export default async function getProductData(category, productUrl) {
  const browser = await puppeteer.launch({
    headless: 'new',
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
    return productUrl.slice(0, 10);
  });

  const results = { category, products: [] };
  const batch_size = 1;
  for (let i = 0; i < products.length; i+= batch_size) {
    const batch = products.slice(i, i + batch_size)
    const newSinglePage = await browser.newPage()
    newSinglePage.setDefaultNavigationTimeout(0);
    await newSinglePage.goto(batch[0], {timeout: 0, waitUntil: "domcontentloaded"});
    
    const productInfo = await ScrapeIndividual(newSinglePage);
    results.products.push(productInfo);
  }

  await browser.close()
  return await results;
}
