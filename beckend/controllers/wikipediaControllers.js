const scrapperService = require("../services/scrapper");

function validArticleName(article) {
    return /^[\p{L}\p{N}\p{M}0-9-_]+$/u.test(article);
}

exports.getWikiArticleIntroduction = async function (req, res) {
    const articleName = req.params.id;
    try {
        if (!validArticleName(articleName))
            return res.status(400).send({ message: "You may only accept article names that are comprised of letters, hyphens (-), underscores (_) and numbers" });

        const language = req.headers["accept-language"] || "en" // there is no extra validation yet
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





