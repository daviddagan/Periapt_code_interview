const express = require("express");
const router = express.Router();
const wikipediaControllers = require("../controllers/wikipediaControllers");

router.get("/:id",[],wikipediaControllers.getWikiArticleIntroduction);

module.exports = router;
