const express = require("express");
const router = express.Router();
const wikipediaControllers = require("../controllers/wikipediaControllers");

const validArticleName = function (article) {
    return /^[\p{L}\p{N}\p{M}0-9-_]+$/u.test(article);
}


router.get("/:id", function (req, res, next) {

    const articleName = req.params.id;
    if (!validArticleName(articleName)) {
        return res.status(400).send({ message: "You may only accept article names that are comprised of letters, hyphens (-), underscores (_) and numbers" });
    }
    next();
}, wikipediaControllers.getWikiArticleIntroduction);

module.exports = router;
