
const puppeteer = require('puppeteer');

const returnNowEpochUtC = () => {
    const now = new Date()
    const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000)
    return Math.round(utcMilllisecondsSinceEpoch / 1000)
}

const getWikiArticleIntroduction = async (articleName,language) => {
    const wikiPage = `${language}.wikipedia.org/wiki`
    const introductionSelector = "#mw-content-text .mw-parser-output p:nth-of-type(2)" // wikipedia introduction selector
    try {
        return await scrapSegment(wikiPage,articleName,introductionSelector);
    } catch (error) {
        throw error 
    }

};
const getNotWikiArticleIntroduction = async (articleName,language) => {
    const wikiPage = `notwikipedia.com/wiki`
    const introductionSelector = "#mw-content-text .mw-parser-output p:nth-of-type(2)" // wikipedia introduction selector
    try {
        return await scrapSegment(wikiPage,articleName,introductionSelector);
    } catch (error) {
        throw error 
    }

};

const scrapSegment = async (sPage, articleName, selector) => {
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
    getWikiArticleIntroduction,
};
