import getProductData from './productScraper.js';
import { menUrls, WomenUrls } from './ScrapeUrls.js';
import puppeteer from 'puppeteer';
import ScrapeIndividual from './individualPageScrape.js';
import fs from 'fs';
export default (async function temporaryScrape() {
  const menResults = { name: 'men', categoryResults: [] };
  const menCategories = menUrls.map(async (category) => {
    return await getProductData(category.category, category.link);
  });

  const result = await Promise.all(menCategories);
  //   console.log(await result);

  fs.writeFile('temporyData.js', JSON.stringify(result), (err) => {
    if (err) throw err;
    console.log('the file has been created successfully');
  });

  //   const browser = await puppeteer.launch({
  //     headless: false,
  //     defaultViewport: false,
  //     dumpio: true
  //   });
  //   const page = await browser.newPage();
  //   //   page.on('console', (msg) => console.log(msg.type, 'PAGE LOG:', msg.text));  oductUrl =
  //     'https://www.asos.com/messina-hembry-clothing-ltd/vintage-levis-size-l-90s-sweatshirt-in-grey/prd/205035157?clr=grey&colourWayId=205035165&cid=51032';
  //   await page.goto(productUrl);
  //   console.log('hdcnakhzckhzcx');
  //   console.log(
  //     await ScrapeIndividual(page).catch((err) => {
  //       console.log('err here: ', err);
  //       browser.close();
  //     }),
  //   );
})();
