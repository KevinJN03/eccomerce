import { v4 as uuid } from 'uuid';

async function ScrapeIndividual(page) {
  const titleSelector = await page.waitForSelector('.jcdpl');
  const imageSelector = await page.waitForSelector('.gallery-image');
  const priceSelector = await page.waitForSelector(
    'span[data-testid="current-price"]',
  );
  // const SizeSelector = await page.waitForSelector('#variantSelector');
  const detailSelector = await page.waitForSelector('.F_yfF');
  const title = await titleSelector.evaluate((el) => el.textContent);
  const images = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        '.amp-images > .amp-frame > .fullImageContainer > .img',
      ),
      (el) => el.src,
    ),
  );
  const price = await priceSelector.evaluate((el) =>
    parseFloat(el.textContent.slice(1)),
  );

  // console.log('validator: ', await page.$('#variantSelector'));

  // page.evaluate(() => console.log('hello', 5, {foo: 'bar'}));
  let totalSize;

  if ((await page.$('#variantSelector')) != null) {
    const size = await page.evaluate(async () => {
      const sizes = Array.from(
        document.querySelectorAll('#variantSelector > option'),
        (el) => {
          return {
            size: el.textContent.replace('- Out of stock', ''),
            stock: Math.floor(Math.random() * 20),
          };
        },
      );

      const allOptionSize = [...sizes.slice(1)];
      return allOptionSize;
    });
    totalSize = size;
  } else {
    const singleProductSize = await page
      .$('[data-testid="productSize"]')
      .then((selector) => {
        return selector.evaluate((el) => el.textContent);
      });

    totalSize = [
      {
        size: await singleProductSize,
        stock: Math.floor(Math.random() * 20),
      },
    ];

    return totalSize;
  }

  const detail = await detailSelector.evaluate((section) => {
    const itemDetail = Array.from(
      section.querySelectorAll('ul > li'),
      (el) => el.textContent,
    );
    return itemDetail;
  });

  page.close();
  return { id: uuid(), title, images, price, sizes: totalSize, detail };
}

export default ScrapeIndividual;
