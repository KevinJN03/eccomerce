import getProductData from './productScraper.js';
import { menUrls, WomenUrls } from './ScrapeUrls.js';
import puppeteer from 'puppeteer';
import ScrapeIndividual from './individualPageScrape.js';
import fs from 'fs';
import jsonfile from 'jsonfile';

const fetchCategoryResults = async (gender, urls) => {
  const result = { gender, categoryResults: [] };
  const categories = urls.map(async (category) => {
    return await getProductData(category.category, category.link);
  });
  const resultFromScrape = await Promise.all(categories);
  await resultFromScrape.map((item) => result.categoryResults.push(item));
  console.log(`${gender} results: `, await resultFromScrape);
  const container = `const ${gender}Data = ${result}\r\n export default ${gender}Data`;
  jsonfile.writeFile(
    `temporyData${gender}.json`,
    result,
    { spaces: 2, EOL: '\r\n' },
    (err) => {
      if (err) throw err;
      console.log('the file has been created successfully');
    },
  );
};
export default (async function temporaryScrape() {
  await fetchCategoryResults('Men', menUrls).then(async () => {
    await fetchCategoryResults('Women', WomenUrls);
  });
  // const arr = [];
  // const browser = await puppeteer.launch({
  //   headless: false,
  //   defaultViewport: false,
  //   dumpio: false,
  // });
  // const page = await browser.newPage();
  // page.on('console', (msg) => console.log(msg.type, 'PAGE LOG:', msg.text));
  // const productUrl =
  //   'https://www.asos.com/river-island/river-island-oversized-scarf-in-light-purple/prd/204064210?clr=purple-light&colourWayId=204064213&cid=4210';
  // // await getProductData(menUrls[0].category, menUrls[0].link)
  // await page.goto(productUrl, { waitUntil: 'load' });
  // await ScrapeIndividual(page, arr)
  //   .catch((err) => {
  //     console.log('err here: ', err);

  //     browser.close();
  //   })
  //   .then((result) => {
  //     console.log('result here:', result);
  //     console.log('arr:', arr);
  //     page.close();
  //     browser.close();
  //   });
})();
