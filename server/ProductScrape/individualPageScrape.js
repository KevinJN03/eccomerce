import { v4 as uuid } from 'uuid';

async function checkProduct(product) {
  const keyArr = await Object.keys(product);
  console.log(keyArr);

  if (keyArr.length > 4) {
    return product;
  }
  return null;
}
async function ScrapeIndividual(page) {
  try {
    // page.waitForNavigation();
    const titleSelector = await page.waitForSelector('.jcdpl', {
      visible: true,
    });

    //   'span[data-testid="current-price"]',
    // );

    const title = await titleSelector.evaluate((el) =>
      el.textContent.replaceAll('ASOS', 'GLAMO'),
    );
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
    let price = {};
    if ((await page.$('span[data-testid="current-price"]')) != null) {
      const priceResult = await page
        .$('span[data-testid="current-price"]')
        .then((selector) =>
          selector.evaluate((el) =>
            parseFloat(el.textContent.replaceAll(/Now|£|From/g, '').trim()),
          ),
        );

      price.current = priceResult;
    }

    if ((await page.$('span[data-testid="previous-price"]')) != null) {
      const previousPriceresult = await page
        .$('span[data-testid="previous-price"]')
        .then((selector) =>
          selector.evaluate((item) => {
            return parseFloat(
              item.textContent.replace(/Was|£|RRP/g, '').trim(),
            );
          }),
        );
      price.previous = previousPriceresult;
    }

    let totalSize;

    if ((await page.$('#variantSelector')) != null) {
      const size = await page.evaluate(async () => {
        const sizes = Array.from(
          document.querySelectorAll('#variantSelector > option'),
          (el) => {
            let newTitle = el.textContent;
            if (newTitle.includes('-')) {
              const [beforeHypen] = newTitle.split('-');
              console.log('beforeHypen', beforeHypen);
              newTitle = beforeHypen.trim();
            }

            const newSize = {
              size: newTitle,
              stock: Math.floor(Math.random() * 20),
            };
            return newSize;
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

      // return totalSize;
    }
    let detail;
    if ((await page.$('.F_yfF')) != null) {
      const detailResult = await page.$('.F_yfF').then((selector) =>
        selector.evaluate(async (section) => {
          const itemDetail = Array.from(
            section.querySelectorAll('ul > li'),
            (el) => el.textContent.replaceAll('ASOS', 'GLAMO'),
          );
          return itemDetail;
        }),
      );
      detail = detailResult;
    } else {
      console.log('this is the issue page:', page.url());
    }

    let color = '';
    if ((await page.$('div[data-testid="productColour"]')) != null) {
      const colorResult = await page
        .$('div[data-testid="productColour"] > p')
        .then((selector) =>
          selector.evaluate(async (text) => text.textContent),
        );
      color = colorResult;
    }

    const product = await {
      title,
      images,
      price,
      size: totalSize,
      detail,
      url: page.url(),
      color,
    };

    return await product;
  } catch (error) {
    /* eslint-disable no-console */
    console.log(`err at this prouct: ${page.url()}`);
    console.log(`error`, error);
    page.close();
  }
}

export default ScrapeIndividual;
