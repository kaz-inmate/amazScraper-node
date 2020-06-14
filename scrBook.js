const puppeteer = require('puppeteer');

const getData = async (url, page) => {
  await page.goto(url);
 
  const categories = await page.$eval('.page-header.action', category => category.innerText);
  const titles = await page.$$eval('.product_pod h3 a', title => title.map(t =>t.innerText.replace(/\./g, '')));

  const prices = await page.$$eval('.product_price .price_color', price => price.map(p =>p.innerText));
 
  
  if (await page.$('.pager li.next') !== null) {
    const nextPage = await page.$eval('.pager li.next a', h => h.href);
    await getData(nextPage, page);
  }
 
return {
  categories,
  titles,
  prices
}
  
};

const getLinks = async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('http://books.toscrape.com/index.html');
  
  const links = await page.$$eval('.nav.nav-list a', allA => allA.map(a => a.href));
  links.shift();

  await browser.close();
  return links;
}

let main = async () => {

  const allLinks = await getLinks();

  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  

  let allData = [];

  for(let link of allLinks) {
    const data = await getData(link, page);
    allData.push(data);
  }
  


  await browser.close();
  console.log(allData)
}

main();
