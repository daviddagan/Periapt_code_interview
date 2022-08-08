const scrapperService = require("../services/scrapper");

function validArticleName(article) {
    return /^[A-Za-z0-9-_]*$/.test(article);
}

exports.getWikiArticleIntroduction = async function (req, res) {
    const articleName = req.params.id;
    try {
        if (!validArticleName(articleName)) {
            return res.status(400).send({ message: "You may only accept article names that are comprised of letters, hyphens (-), underscores (_) and numbers" });
        }
        const selector = "#mw-content-text .mw-parser-output p:nth-of-type(2)" // wikipedia introduction selector
        const wikiPage =  "en.wikipedia.org/wiki"
        const articleIntroduction = await scrapperService.getArticleIntroduction(wikiPage,articleName,selector);
        res.status(200).json(articleIntroduction);
    } catch (e) {
        res.status(500).send({
            message: e.message || "failed load messages"
        });
    }
};





