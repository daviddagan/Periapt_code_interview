const scrapperService = require("../services/scrapper");
const userControllers = require("../controllers/userControllers");


const validArticleName = function (article) {
    return /^[\p{L}\p{N}\p{M}0-9-_]+$/u.test(article);
}

const favoriteLang = function (headers) {
    const acceptedlang = headers["accept-language"];
    if (acceptedlang) return acceptedlang;

    const token = headers['x-auth-token']; // Get the token from 'x-auth-token' header
    console.log(token); 
    if (token) {
        console.log(token," is not null"); 
        return userControllers.getUserLangByToken(token);
    }
    return "en";
}

exports.getWikiArticleIntroduction = async function (req, res) {
    const articleName = req.params.id;
    try {
        if (!validArticleName(articleName))
            return res.status(400).send({ message: "You may only accept article names that are comprised of letters, hyphens (-), underscores (_) and numbers" });

        const language = favoriteLang(req.headers) // there is no extra validation yet
        const wikiPage = `${language}.wikipedia.org/wiki`
        const introductionSelector = "#mw-content-text .mw-parser-output p:nth-of-type(2)" // wikipedia introduction selector

        const articleIntroduction = await scrapperService.getArticleIntroduction(wikiPage, articleName, introductionSelector);
        res.status(200).json(articleIntroduction);

    } catch (e) {
        res.status(500).send({
            message: e.message || "failed load messages"
        });
    }
};





