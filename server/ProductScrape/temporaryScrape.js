import getProductData from './productScraper.js';
import { menUrls, WomenUrls } from './ScrapeUrls.js';
import puppeteer from 'puppeteer';
import ScrapeIndividual from './individualPageScrape.js';
import fs from 'fs';

const fetchCategoryResults = async (gender, urls) => {
  const result = { gender, categoryResults: [] };
  const categories = urls.map(async (category) => {
    return await getProductData(category.category, category.link);
  });
  const resultFromScrape = await Promise.all(categories);
  await resultFromScrape.map((item) => result.categoryResults.push(item));
  console.log(`${gender} results: `, await resultFromScrape);

  fs.writeFile(`temporyData${gender}.js`, JSON.stringify(result), (err) => {
    if (err) throw err;
    console.log('the file has been created successfully');
  });
};
export default (async function temporaryScrape() {
  await fetchCategoryResults('Men', menUrls).then(async () => {
    await fetchCategoryResults('Women', WomenUrls);
  });
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
