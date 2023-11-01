// import { v4 } from 'uuid';

import crypto from 'crypto';

async function ScrapeIndividual(page) {
  try {
    let isColorPresent = false;
    let isSizePresent = false;
    const variations = [];
    const color = {
      name: 'Colour',
      default: true,
      quantityHeader: { on: false },
      priceHeader: { on: false },
      combine: false,
      options: [],
    };
    const size = {
      name: 'Size',
      default: true,
      quantityHeader: { on: false },
      priceHeader: { on: false },
      combine: false,
      options: [],
    };

    const titleSelector = await page.waitForSelector('.jcdpl', {
      visible: true,
    });

    //   'span[data-testid="current-price"]',
    // );
    console.log({ titleSelector });
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
      const previousPriceResult = await page
        .$('span[data-testid="previous-price"]')
        .then((selector) =>
          selector.evaluate((item) => {
            return parseFloat(
              item.textContent.replace(/Was|£|RRP/g, '').trim(),
            );
          }),
        );
      price.previous = previousPriceResult;
    }
    // console.log('here: ', size);
    if ((await page.$('#variantSelector')) != null) {
      // const colorResult = await page
      //   .$('div[data-testid="productColour"] > p')
      //   .then((selector) => selector.evaluate(async (text) => text.textContent));
      // const test = await page.$('#variantSelector').then(async (selector) => {
      //   const arr = Array.from(
      //     document.querySelectorAll('#variantSelector > option'),
      //   ).map((el) => el.textContent);

      //   return arr
      //   // await selector.$('option').evaluate((text) => text.textContent);
      //   // return selector.evaluate(async (text) => text.textContent);
      // });

      const sizes = await page.evaluate(async () => {
        const arr = Array.from(
          document.querySelectorAll('#variantSelector > option'),
        );
        console.log({ arr });
        return arr;
      });
      sizes.map((el) => {
        let newTitle = el.textContent;
        if (newTitle.includes('-')) {
          const [beforeHypen] = newTitle.split('-');
          console.log('beforeHypen', beforeHypen);
          newTitle = beforeHypen.trim();
        }

        // const newSize = {
        //   size: newTitle,
        //   stock: Math.floor(Math.random() * 20),
        // };

        const newId = crypto.randomUUID();
        console.log('size in forEch: ', size);
        const { options } = size;

        options.push([newId, { id: newId, variation: newTitle }]);
        isSizePresent = true;
        // return newSize;
      });
      // sizes.map((el) => {
      //   let newTitle = el.textContent;
      //   if (newTitle.includes('-')) {
      //     const [beforeHypen] = newTitle.split('-');
      //     console.log('beforeHypen', beforeHypen);
      //     newTitle = beforeHypen.trim();
      //   }

      //   // const newSize = {
      //   //   size: newTitle,
      //   //   stock: Math.floor(Math.random() * 20),
      //   // };

      //   const newId = crypto.randomUUID();

      //   const { options } = size;

      //   options.push([newId, { id: newId, variation: newTitle }]);
      //   // return newSize;
      // });

      // const allOptionSize = [...sizes.slice(1)];
      // return allOptionSize;

      // totalSize = size;
    } else if ((await page.$('[data-testid="productSize"]')) != null) {
      const singleProductSize = await page
        .$('[data-testid="productSize"]')
        .then((selector) => {
          return selector.evaluate((el) => el.textContent);
        });
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

    if ((await page.$('div[data-testid="productColour"]')) != null) {
      const colorResult = await page
        .$('div[data-testid="productColour"] > p')
        .then((selector) =>
          selector.evaluate(async (text) => text.textContent),
        );

      // console.log({colorResult})

      const { options } = color;
      const newId = crypto.randomUUID();
      options.push([newId, { id: newId, variation: colorResult }]);
      // color.options.colorResult;

      isColorPresent = true;
    }

    if (isColorPresent) {
      variations.push(color);
    }
    if (isSizePresent) {
      variations.push(size);
    }

    const product = await {
      title,
      images,
      price,
      detail,
      url: page.url(),
      stock: Math.floor(Math.random() * 200),
      variations,
    };

    return product;
  } catch (error) {
    /*  eslint-disable no-console */
    console.log(`err at this prouct: ${page.url()}`);
    console.log(`error`, error);
    page.close();
  }
}

export default ScrapeIndividual;
