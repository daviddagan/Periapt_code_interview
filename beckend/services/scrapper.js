
const puppeteer = require('puppeteer');

const returnNowEpochUtC = () => {
    const now = new Date()
    const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000)
    return Math.round(utcMilllisecondsSinceEpoch / 1000)
}

const getArticleIntroduction = async (sPage, articleName, selector) => {
    const browser = await puppeteer.launch(); // need to get out to init or somthing
    try {
        const page = await browser.newPage(); // need to get out to init or somthing
        await page.goto(`https://${sPage}/${articleName}`);
        await page.waitForSelector(selector) // waiting the element to be written in the dom
        const spanVal = await page.$eval(selector, el => el.textContent);
        await browser.close();
        return {
            scrapeDate: returnNowEpochUtC(),
            articleName: articleName,
            introduction: spanVal
        }
    } catch (error) {
        await browser.close();
        throw error 
    }

};


module.exports = {
    getArticleIntroduction,
};
