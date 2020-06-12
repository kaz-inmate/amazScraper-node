const puppeteer = require('puppeteer');
const info = require('./info');

module.exports.getData = async (url, cb) => {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();

        await page.goto(url, {waitUntil: "domcontentloaded"});
      
        const result = await page.evaluate((info) => {
            let data = []

        let categories = Array.from(document.querySelector('.nav-search-dropdown').options);
        categories.forEach(el => {
            let obj = {
                text: el.text,
                link : info.mainUrl + el.getAttribute('value').replace('=', '%3D') + info.sideUrl
            }
               data.push(obj);
            });
            return data;
        }, info);

        await browser.close();
        cb(result, true);
};