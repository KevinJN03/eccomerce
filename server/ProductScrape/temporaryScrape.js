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
  //   let counter = 0;
  //   let menCategories;
  //   while (counter < menUrls.length) {
  //     await getProductData(menUrls[counter].category, menUrls[counter].link).then(
  //       (res) => {
  //         console.log('res', res);
  //         counter++;
  //       },
  //     );
  //   }
  const result = await Promise.all(menCategories);
  console.log(await result);

  //   fs.writeFile('temporyData.js', JSON.stringify(result), (err) => {
  //     if (err) throw err;
  //     console.log('the file has been created successfully');
  //   });

  //   const browser = await puppeteer.launch({
  //     headless: false,
  //     defaultViewport: false,
  //     dumpio: true,
  //   });
  //   const page = await browser.newPage();
  //   page.on('console', (msg) => console.log(msg.type, 'PAGE LOG:', msg.text));  oductUrl =
  //   const productUrl =
  //     'https://www.asos.com/men/ctas/usa-fashion-online-14/cat/?cid=16691';

  //     await getProductData(menUrls[0].category, menUrls[0].link)
  //   await page.goto(productUrl);
  //   console.log('hdcnakhzckhzcx');
  //   console.log(
  //     await ScrapeIndividual(page).catch((err) => {
  //       console.log('err here: ', err);
  //       browser.close();
  //     }),
  //   );
})();
