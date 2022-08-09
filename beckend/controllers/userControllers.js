const dbHandlerService = require("../services/dbHndler");


exports.createUser = function (req, res) {
    try {
        const { userName, language } = req.body
        const token = dbHandlerService.createUser(userName, language);
        res.status(200).json(token);
    } catch (e) {
        res.status(500).send({
            message: e.message || "failed create user" //TODO: it need to be message or something else
        });
    }
};


exports.getUserLangByToken = function (token) {
    try {
        return dbHandlerService.returnUserByToken(token)[language];
    } catch (e) {
        return "en"
    }
};




