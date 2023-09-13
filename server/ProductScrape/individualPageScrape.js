import { v4 as uuid } from 'uuid';

async function ScrapeIndividual(page) {
  try { 
    page.waitForNavigation()
    const titleSelector = await page.waitForSelector('.jcdpl', {
      visible: true,
    });
    const priceSelector = await page.waitForSelector(
      'span[data-testid="current-price"]',
    );

    const title = await titleSelector.evaluate((el) => el.textContent);
    const images = await page.evaluate(() => {
      const imgArr = Array.from(
        document.querySelectorAll(
          '.amp-images > .amp-frame > .fullImageContainer > .img',
        ),
        (el) => el.src,
      );
      imgArr.sort((a, b) => {
        if (a === imgArr[1]) return -1;
        if (b === imgArr[1]) return 1;
      });
      return imgArr;
    });
    const price = await priceSelector.evaluate((el) =>
      parseFloat(el.textContent.slice(1)),
    );
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
    } else if ((await page.$('[data-testid="productSize"]')) != null) {
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
    let detail;
    if ((await page.$('.F_yfF')) != null) {
      await page.$('.F_yfF').then((selector) =>
        selector.evaluate(async (section) => {
          const itemDetail = Array.from(
            section.querySelectorAll('ul > li'),
            (el) => el.textContent,
          );
          detail = await itemDetail;
          return detail;
        }),
      );
    } else {
      console.log('this is the issue page:', page.url());
    }

    await page.close();
    return {
      id: uuid(),
      title,
      images,
      price,
      sizes: totalSize,
      detail,
      url: page.url(),
    };
  } catch (error) {
    console.log(`err at this prouct: ${page.url()}`);
    console.log(`error`, error);
  }
}

export default ScrapeIndividual;
